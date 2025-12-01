'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { uploadMultipleImages, getPathFromUrl } from '@/lib/actions';
import ProductForm, { ProductFormData } from '@/components/Admin/ProductForm';
import { Handbag } from '@/typings';
import { IMAGE_UPLOAD_CONFIG } from '@/lib/constants';
import { createClient } from '@/lib/supabase/client';

interface PageProps {
  params: {
    id: string;
  };
}
const supabase = createClient()
export default function EditProductPage({ params }: PageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState<Handbag | null>(null);

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    condition: 'new',
    brand: '',
    color: '',
    material: '',
    whatsapp_number: '',
    stock_status: 'in_stock',
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

    if (totalImages > IMAGE_UPLOAD_CONFIG.MAX_IMAGES) {
      setError(`Maximum ${IMAGE_UPLOAD_CONFIG.MAX_IMAGES} images allowed`);
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
        newImageUrls = await uploadMultipleImages(newImageFiles, formData.condition);
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

      <ProductForm
        initialData={formData}
        existingImages={existingImages}
        newImagePreviews={newImagePreviews}
        uploadingImages={uploadingImages}
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onImageChange={handleNewImageChange}
        onRemoveExistingImage={removeExistingImage}
        onRemoveNewImage={removeNewImage}
        submitButtonText="Save Changes"
        submitting={saving}
        isEditing={true}
        onCancel={() => router.back()}
      />
    </div>
  );
}
