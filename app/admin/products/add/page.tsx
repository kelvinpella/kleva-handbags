"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadMultipleImages, createProduct } from "@/lib/actions";
import ProductForm, { ProductFormData } from "@/components/Admin/ProductForm";
import { IMAGE_UPLOAD_CONFIG } from "@/lib/constants";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    condition: "new",
    brand: "",
    material: "",
    stock_status: "in_stock",
    dimensions: "",
    number_of_colors_available: "1",
    buying_price: "",
    selling_price: "",
    items_sold: "0",
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    setError("");
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate
      if (imageFiles.length === 0) {
        throw new Error("Please upload at least one image");
      }

      if (!formData.name || !formData.description || !formData.selling_price) {
        throw new Error("Please fill in all required fields");
      }

      // Upload images
      setUploadingImages(true);
      const imageUrls = await uploadMultipleImages(imageFiles, formData.condition);
      setUploadingImages(false);

      if (imageUrls.length === 0) {
        throw new Error("Failed to upload images");
      }

      // Create product using server action
      const result = await createProduct({
        name: formData.name,
        description: formData.description,
        condition: formData.condition,
        brand: formData.brand,
        material: formData.material,
        images: imageUrls,
        stock_status: formData.stock_status,
        dimensions: formData.dimensions,
        number_of_colors_available: formData.number_of_colors_available ? parseInt(formData.number_of_colors_available) : 1,
        buying_price: formData.buying_price ? parseFloat(formData.buying_price) : undefined,
        selling_price: parseFloat(formData.selling_price),
        items_sold: formData.items_sold ? parseInt(formData.items_sold) : 0,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to create product");
      }

      // Success
      router.push("/admin/products");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Failed to create product");
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
