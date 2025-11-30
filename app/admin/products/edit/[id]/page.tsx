'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { uploadMultipleImages, deleteImage, getPathFromUrl } from '@/lib/supabase-storage';
import Image from 'next/image';
import { Handbag } from '@/typings';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: PageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState<Handbag | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    condition: 'new' as 'new' | 'second-hand',
    brand: '',
    color: '',
    material: '',
    whatsapp_number: '',
    stock_status: 'in_stock' as 'in_stock' | 'out_of_stock',
  });

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  async function fetchProduct() {
    try {
      const { data, error } = await supabase
        .from('handbags')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      setProduct(data);
      setFormData({
        name: data.name,
        description: data.description,
        price: data.price.toString(),
        condition: data.condition,
        brand: data.brand,
        color: data.color,
        material: data.material,
        whatsapp_number: data.whatsapp_number,
        stock_status: data.stock_status,
      });
      setExistingImages(data.images || []);
    } catch (err: any) {
      console.error('Error fetching product:', err);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const totalImages = existingImages.length + newImageFiles.length + fileArray.length;

    if (totalImages > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    setNewImageFiles((prev) => [...prev, ...fileArray]);

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setNewImagePreviews((prev) => [...prev, ...previews]);
    setError('');
  };

  const removeExistingImage = async (index: number) => {
    const imageUrl = existingImages[index];
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    // Note: We'll handle actual deletion from storage when saving
  };

  const removeNewImage = (index: number) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const totalImages = existingImages.length + newImageFiles.length;
      if (totalImages === 0) {
        throw new Error('Please have at least one image');
      }

      // Upload new images if any
      let newImageUrls: string[] = [];
      if (newImageFiles.length > 0) {
        setUploadingImages(true);
        newImageUrls = await uploadMultipleImages(newImageFiles);
        setUploadingImages(false);
      }

      // Combine existing and new images
      const allImages = [...existingImages, ...newImageUrls];

      // Update product
      const { error: updateError } = await supabase
        .from('handbags')
        .update({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          condition: formData.condition,
          brand: formData.brand,
          color: formData.color,
          material: formData.material,
          images: allImages,
          whatsapp_number: formData.whatsapp_number,
          stock_status: formData.stock_status,
        })
        .eq('id', params.id);

      if (updateError) throw updateError;

      // Success
      router.push('/admin/products');
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Failed to update product');
    } finally {
      setSaving(false);
      setUploadingImages(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Edit Product</h1>
        <p className="text-neutral-600 mt-2">Update product information</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-lg p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">
              Current Images
            </label>
            <div className="grid grid-cols-5 gap-4">
              {existingImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden group"
                >
                  <Image src={image} alt={`Current ${index + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Images */}
        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-2">
            Add New Images (Optional)
          </label>
          <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImageChange}
              disabled={uploadingImages}
              className="block w-full text-sm text-neutral-600
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-neutral-900 file:text-white
                hover:file:bg-neutral-800
                file:cursor-pointer cursor-pointer"
            />
            <p className="mt-2 text-xs text-neutral-500">
              Maximum {5 - existingImages.length} more images
            </p>
          </div>

          {/* New Image Previews */}
          {newImagePreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-5 gap-4">
              {newImagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden group"
                >
                  <Image src={preview} alt={`New ${index + 1}`} fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-900 mb-2">
            Product Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-neutral-900 mb-2">
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-neutral-900 mb-2">
              Price (TSh) <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-neutral-900 mb-2">
              Condition <span className="text-red-600">*</span>
            </label>
            <select
              id="condition"
              name="condition"
              required
              value={formData.condition}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            >
              <option value="new">New</option>
              <option value="second-hand">Second Hand</option>
            </select>
          </div>

          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-neutral-900 mb-2">
              Brand <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              required
              value={formData.brand}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-neutral-900 mb-2">
              Color <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="color"
              name="color"
              required
              value={formData.color}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="material" className="block text-sm font-medium text-neutral-900 mb-2">
              Material <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="material"
              name="material"
              required
              value={formData.material}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="stock_status" className="block text-sm font-medium text-neutral-900 mb-2">
              Stock Status
            </label>
            <select
              id="stock_status"
              name="stock_status"
              value={formData.stock_status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            >
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* WhatsApp Number */}
        <div>
          <label htmlFor="whatsapp_number" className="block text-sm font-medium text-neutral-900 mb-2">
            WhatsApp Number <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            id="whatsapp_number"
            name="whatsapp_number"
            required
            value={formData.whatsapp_number}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center space-x-4 pt-6 border-t border-neutral-200">
          <button
            type="submit"
            disabled={saving || uploadingImages}
            className="px-6 py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {uploadingImages ? 'Uploading...' : saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}