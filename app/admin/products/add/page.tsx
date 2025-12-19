"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadMultipleImages, createProduct, updateProduct, fetchProductById } from "@/lib/actions";
import ProductForm, { ProductFormData } from "@/components/Admin/ProductForm";
import { IMAGE_UPLOAD_CONFIG } from "@/lib/constants";
import { calculateRetailPrice, calculateWholesalePriceTZS, calculateWholesalePriceUSD } from "@/lib/pricing";
import { fetchExchangeRate } from "@/lib/exchangeRate";
import { v4 as uuidv4 } from "uuid";

function AddProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditMode = !!editId;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [error, setError] = useState("");
  const [exchangeRate, setExchangeRate] = useState<number>(0); // No default rate
  const [exchangeRateError, setExchangeRateError] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    condition: "new",
    brand: "",
    material: "",
    stock_status: "in_stock",
    dimensions: "",
    buying_price: "",
    retail_price: "",
    wholesale_price_tzs: "",
    wholesale_price_usd: "",
    store: "",
  });

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreviews] = useState<string[]>([]);

  // Fetch exchange rate on component mount
  useEffect(() => {
    async function loadExchangeRate() {
      try {
        const rate = await fetchExchangeRate();
        if (rate > 0) {
          setExchangeRate(rate);
          setExchangeRateError(false);
        } else {
          setExchangeRateError(true);
          setError("Failed to fetch exchange rate. Please check your internet connection and try again.");
        }
      } catch (err) {
        console.error("Failed to fetch exchange rate:", err);
        setExchangeRateError(true);
        setError("Failed to fetch exchange rate. Please check your internet connection and try again.");
      }
    }
    loadExchangeRate();
  }, []);

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
          price: data.retail_price?.toString() || "",
          condition: data.condition,
          brand: data.brand,
          material: data.material,
          stock_status: data.stock_status,
          dimensions: data.dimensions || "",
          buying_price: data.buying_price?.toString() || "",
          retail_price: data.retail_price?.toString() || "",
          wholesale_price_tzs: data.wholesale_price_tzs?.toString() || "",
          wholesale_price_usd: data.wholesale_price_usd?.toString() || "",
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

    // If buying price changes, automatically calculate all prices
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

      const retailPrice = calculateRetailPrice(buyingPrice);
      const wholesalePriceTZS = calculateWholesalePriceTZS(buyingPrice);
      const wholesalePriceUSD = calculateWholesalePriceUSD(buyingPrice, exchangeRate);

      // Show warning if exchange rate is not available
      if (exchangeRate <= 0 && !exchangeRateError) {
        setExchangeRateError(true);
        setError("Exchange rate unavailable. USD wholesale price cannot be calculated.");
      }

      setFormData((prev) => ({
        ...prev,
        buying_price: value,
        retail_price: retailPrice > 0 ? retailPrice.toString() : "",
        wholesale_price_tzs: wholesalePriceTZS > 0 ? wholesalePriceTZS.toString() : "",
        wholesale_price_usd: wholesalePriceUSD > 0 ? wholesalePriceUSD.toString() : ""
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

      if (!formData.name || !formData.retail_price) {
        throw new Error("Please fill in all required fields");
      }

      // Validate buying price
      const buyingPrice = formData.buying_price ? parseFloat(formData.buying_price) : 0;
      if (buyingPrice <= 0) {
        throw new Error("Buying price must be greater than 0");
      }

      // Validate all prices
      const retailPrice = parseFloat(formData.retail_price);
      const wholesalePriceTZS = parseFloat(formData.wholesale_price_tzs || "0");
      const wholesalePriceUSD = parseFloat(formData.wholesale_price_usd || "0");

      if (retailPrice <= 0 || wholesalePriceTZS <= 0) {
        throw new Error("Retail and wholesale prices (TZS) must be greater than 0");
      }

      // Check if exchange rate is available for USD price
      if (exchangeRate <= 0 || wholesalePriceUSD <= 0) {
        throw new Error("Exchange rate unavailable. Cannot calculate USD wholesale price. Please refresh the page and try again.");
      }

      let result;
      let productId: string;

      if (isEditMode && editId) {
        // For edit mode, use the existing product ID
        productId = editId;

        // Upload new images if any
        let newImageUrls: string[] = [];
        if (imageFiles.length > 0) {
          setUploadingImages(true);
          newImageUrls = await uploadMultipleImages(imageFiles, formData.condition, productId);
          setUploadingImages(false);

          if (newImageUrls.length === 0) {
            throw new Error("Failed to upload images");
          }
        }

        // Combine existing and new images
        const allImages = [...existingImages, ...newImageUrls];

        const productData = {
          name: formData.name,
          condition: formData.condition,
          brand: formData.brand,
          material: formData.material,
          images: allImages,
          stock_status: formData.stock_status,
          dimensions: formData.dimensions,
          buying_price: formData.buying_price ? parseInt(formData.buying_price) : undefined,
          retail_price: parseInt(formData.retail_price),
          wholesale_price_tzs: parseInt(formData.wholesale_price_tzs || "0"),
          wholesale_price_usd: parseInt(formData.wholesale_price_usd || "0"),
          store: formData.store || undefined,
        };

        // Update existing product
        result = await updateProduct(productId, productData);
      } else {
        // For new products, generate a UUID first
        productId = uuidv4();

        // Upload images with the generated product ID
        let imageUrls: string[] = [];
        if (imageFiles.length > 0) {
          setUploadingImages(true);
          imageUrls = await uploadMultipleImages(imageFiles, formData.condition, productId);
          setUploadingImages(false);

          if (imageUrls.length === 0) {
            throw new Error("Failed to upload images");
          }
        }

        const productData = {
          id: productId,
          name: formData.name,
          condition: formData.condition,
          brand: formData.brand,
          material: formData.material,
          images: imageUrls,
          stock_status: formData.stock_status,
          dimensions: formData.dimensions,
          buying_price: formData.buying_price ? parseInt(formData.buying_price) : undefined,
          retail_price: parseInt(formData.retail_price),
          wholesale_price_tzs: parseInt(formData.wholesale_price_tzs || "0"),
          wholesale_price_usd: parseInt(formData.wholesale_price_usd || "0"),
          store: formData.store || undefined,
        };

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
        exchangeRate={exchangeRate}
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
