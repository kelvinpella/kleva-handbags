"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadMultipleImages, createProduct, updateProduct, fetchProductById } from "@/lib/actions";
import ProductForm, { ProductFormData } from "@/components/Admin/ProductForm";
import { IMAGE_UPLOAD_CONFIG } from "@/lib/constants";
import { calculateSellingPrice } from "@/lib/pricing";

function AddProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditMode = !!editId;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
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
    store: "",
  });

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreviews] = useState<string[]>([]);

  // Fetch product data if in edit mode
  useEffect(() => {
    async function loadProduct() {
      if (!editId) return;

      setInitialLoading(true);
      try {
        const result = await fetchProductById(editId);

        if (!result.success || !result.data) {
          throw new Error(result.error || "Product not found");
        }

        const data = result.data;
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price?.toString() || data.selling_price?.toString() || "",
          condition: data.condition,
          brand: data.brand,
          material: data.material,
          stock_status: data.stock_status,
          dimensions: data.dimensions || "",
          number_of_colors_available: data.number_of_colors_available?.toString() || "1",
          buying_price: data.buying_price?.toString() || "",
          selling_price: data.selling_price?.toString() || data.price?.toString() || "",
          items_sold: data.items_sold?.toString() || "0",
          store: data.store || "",
        });
        setExistingImages(data.images || []);
      } catch (err: any) {
        console.error("Error loading product:", err);
        setError(err.message || "Failed to load product");
      } finally {
        setInitialLoading(false);
      }
    }

    loadProduct();
  }, [editId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // If buying price changes, automatically calculate selling price
    if (name === "buying_price") {
      const buyingPrice = parseFloat(value) || 0;

      // Validate that buying price is positive
      if (buyingPrice < 0) {
        setError("Buying price cannot be negative");
        return;
      }

      // Clear any previous errors
      if (error && error.includes("price")) {
        setError("");
      }

      const sellingPrice = calculateSellingPrice(buyingPrice);
      setFormData((prev) => ({
        ...prev,
        buying_price: value,
        selling_price: sellingPrice > 0 ? sellingPrice.toString() : ""
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const totalImages = existingImages.length + imageFiles.length + fileArray.length;

    if (totalImages > IMAGE_UPLOAD_CONFIG.MAX_IMAGES) {
      setError(`Maximum ${IMAGE_UPLOAD_CONFIG.MAX_IMAGES} images allowed`);
      return;
    }

    setImageFiles((prev) => [...prev, ...fileArray]);

    // Create previews
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
    setError("");
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
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
      const totalImages = existingImages.length + imageFiles.length;
      if (totalImages === 0) {
        throw new Error("Please upload at least one image");
      }

      if (!formData.name || !formData.description || !formData.selling_price) {
        throw new Error("Please fill in all required fields");
      }

      // Validate buying price
      const buyingPrice = formData.buying_price ? parseFloat(formData.buying_price) : 0;
      if (buyingPrice <= 0) {
        throw new Error("Buying price must be greater than 0");
      }

      // Validate selling price
      const sellingPrice = parseFloat(formData.selling_price);
      if (sellingPrice <= 0) {
        throw new Error("Selling price must be greater than 0");
      }

      // Upload new images if any
      let newImageUrls: string[] = [];
      if (imageFiles.length > 0) {
        setUploadingImages(true);
        newImageUrls = await uploadMultipleImages(imageFiles, formData.condition);
        setUploadingImages(false);

        if (newImageUrls.length === 0) {
          throw new Error("Failed to upload images");
        }
      }

      // Combine existing and new images
      const allImages = [...existingImages, ...newImageUrls];

      const productData = {
        name: formData.name,
        description: formData.description,
        condition: formData.condition,
        brand: formData.brand,
        material: formData.material,
        images: allImages,
        stock_status: formData.stock_status,
        dimensions: formData.dimensions,
        number_of_colors_available: formData.number_of_colors_available ? parseInt(formData.number_of_colors_available) : 1,
        buying_price: formData.buying_price ? parseInt(formData.buying_price) : undefined,
        selling_price: parseInt(formData.selling_price),
        items_sold: formData.items_sold ? parseInt(formData.items_sold) : 0,
        store: formData.store || undefined,
      };

      let result;
      if (isEditMode && editId) {
        // Update existing product
        result = await updateProduct(editId, productData);
      } else {
        // Create new product
        result = await createProduct(productData);
      }

      if (!result.success) {
        throw new Error(result.error || `Failed to ${isEditMode ? "update" : "create"} product`);
      }

      // Success
      router.push("/admin/products");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || `Failed to ${isEditMode ? "update" : "create"} product`);
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-neutral-600 mt-2">
          {isEditMode ? "Update product information" : "Create a new handbag listing"}
        </p>
      </div>

      <ProductForm
        initialData={formData}
        existingImages={existingImages}
        newImagePreviews={imagePreview}
        uploadingImages={uploadingImages}
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
        onRemoveExistingImage={removeExistingImage}
        onRemoveNewImage={removeImage}
        submitButtonText={isEditMode ? "Save Changes" : "Create Product"}
        submitting={loading}
        isEditing={isEditMode}
        onCancel={() => router.back()}
      />
    </div>
  );
}

export default function AddProductPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
      </div>
    }>
      <AddProductContent />
    </Suspense>
  );
}
