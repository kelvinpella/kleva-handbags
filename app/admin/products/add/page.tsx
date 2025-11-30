'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { uploadMultipleImages } from '@/lib/supabase-storage';
import ProductForm, { ProductFormData } from '@/components/Admin/ProductForm';
import { IMAGE_UPLOAD_CONFIG, DEFAULT_WHATSAPP_PREFIX } from '@/lib/constants';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    condition: 'new',
    brand: '',
    color: '',
    material: '',
    whatsapp_number: DEFAULT_WHATSAPP_PREFIX,
    stock_status: 'in_stock',
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
    if (fileArray.length > IMAGE_UPLOAD_CONFIG.MAX_IMAGES) {
      setError(`Maximum ${IMAGE_UPLOAD_CONFIG.MAX_IMAGES} images allowed`);
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

      <ProductForm
        initialData={formData}
        newImagePreviews={imagePreview}
        uploadingImages={uploadingImages}
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        onRemoveNewImage={removeImage}
        submitButtonText="Create Product"
        submitting={loading}
        onCancel={() => router.back()}
      />
    </div>
  );
}