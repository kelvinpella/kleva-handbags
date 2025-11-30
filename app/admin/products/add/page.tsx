'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { uploadMultipleImages } from '@/lib/supabase-storage';
import Image from 'next/image';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    condition: 'new' as 'new' | 'second-hand',
    brand: '',
    color: '',
    material: '',
    whatsapp_number: '+255',
    stock_status: 'in_stock' as 'in_stock' | 'out_of_stock',
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    if (fileArray.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    setImageFiles(fileArray);

    // Create previews
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    setError('');
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate
      if (imageFiles.length === 0) {
        throw new Error('Please upload at least one image');
      }

      if (!formData.name || !formData.description || !formData.price) {
        throw new Error('Please fill in all required fields');
      }

      // Upload images
      setUploadingImages(true);
      const imageUrls = await uploadMultipleImages(imageFiles);
      setUploadingImages(false);

      if (imageUrls.length === 0) {
        throw new Error('Failed to upload images');
      }

      // Insert product
      const { data, error: insertError } = await supabase.from('handbags').insert([
        {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          condition: formData.condition,
          brand: formData.brand,
          color: formData.color,
          material: formData.material,
          images: imageUrls,
          whatsapp_number: formData.whatsapp_number,
          stock_status: formData.stock_status,
        },
      ]).select();

      if (insertError) throw insertError;

      // Success
      router.push('/admin/products');
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'Failed to create product');
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Add New Product</h1>
        <p className="text-neutral-600 mt-2">Create a new handbag listing</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-lg p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-2">
            Product Images <span className="text-red-600">*</span>
          </label>
          <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 hover:border-neutral-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={uploadingImages}
              className="block w-full text-sm text-neutral-600
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-neutral-900 file:text-white
                hover:file:bg-neutral-800
                file:cursor-pointer cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="mt-2 text-xs text-neutral-500">
              PNG, JPG, GIF up to 5MB. Maximum 5 images.
            </p>
          </div>

          {/* Image Previews */}
          {imagePreview.length > 0 && (
            <div className="mt-4 grid grid-cols-5 gap-4">
              {imagePreview.map((preview, index) => (
                <div key={index} className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden group">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
            placeholder="e.g., Elegant Leather Tote"
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
            placeholder="Detailed product description..."
          />
        </div>

        {/* Grid Layout for Multiple Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price */}
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
              placeholder="e.g., 89999.00"
            />
          </div>

          {/* Condition */}
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

          {/* Brand */}
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
              placeholder="e.g., LuxeBrand"
            />
          </div>

          {/* Color */}
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
              placeholder="e.g., Black"
            />
          </div>

          {/* Material */}
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
              placeholder="e.g., Genuine Leather"
            />
          </div>

          {/* Stock Status */}
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
            placeholder="+255712345678"
          />
          <p className="mt-1 text-xs text-neutral-500">
            Include country code (e.g., +255 for Tanzania)
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center space-x-4 pt-6 border-t border-neutral-200">
          <button
            type="submit"
            disabled={loading || uploadingImages}
            className="px-6 py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {uploadingImages ? 'Uploading Images...' : loading ? 'Creating...' : 'Create Product'}
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