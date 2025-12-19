'use client';

import Image from 'next/image';
import { IMAGE_UPLOAD_CONFIG } from '@/lib/constants';

export interface ProductFormData {
  name: string;
  price: string;
  condition: 'new' | 'second-hand';
  brand: string;
  material: string;
  stock_status: 'in_stock' | 'out_of_stock';
  dimensions?: string;
  buying_price?: string;
  retail_price?: string;
  wholesale_price_tzs?: string;
  wholesale_price_usd?: string;
  store?: string;
}

interface ProductFormProps {
  initialData?: ProductFormData;
  existingImages?: string[];
  newImagePreviews?: string[];
  uploadingImages?: boolean;
  loading?: boolean;
  error?: string;
  exchangeRate?: number;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveExistingImage?: (index: number) => void;
  onRemoveNewImage?: (index: number) => void;
  submitButtonText?: string;
  submitting?: boolean;
  isEditing?: boolean;
  onCancel?: () => void;
}

export default function ProductForm({
  initialData,
  existingImages = [],
  newImagePreviews = [],
  uploadingImages = false,
  loading = false,
  error = '',
  exchangeRate = 2400,
  onSubmit,
  onInputChange,
  onImageChange,
  onRemoveExistingImage,
  onRemoveNewImage,
  submitButtonText = 'Create Product',
  submitting = false,
  isEditing = false,
  onCancel,
}: ProductFormProps) {
  const maxAdditionalImages = IMAGE_UPLOAD_CONFIG.MAX_IMAGES - existingImages.length;

  return (
    <form onSubmit={onSubmit} className="bg-white border border-neutral-200 rounded-lg p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Existing Images (Edit mode only) */}
      {isEditing && existingImages.length > 0 && (
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
                {onRemoveExistingImage && (
                  <button
                    type="button"
                    onClick={() => onRemoveExistingImage(index)}
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
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 mb-2">
          {isEditing ? `Add New Images (Optional)` : `Product Images`} <span className="text-red-600">*</span>
        </label>
        <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 hover:border-neutral-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onImageChange}
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
            PNG, JPG, GIF up to {IMAGE_UPLOAD_CONFIG.MAX_FILE_SIZE_MB}MB. Maximum {maxAdditionalImages} images
            {isEditing ? ' more' : ''}.
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
                <Image src={preview} alt={`Preview ${index + 1}`} fill className="object-cover" />
                {onRemoveNewImage && (
                  <button
                    type="button"
                    onClick={() => onRemoveNewImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
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
          value={initialData?.name || ''}
          onChange={onInputChange}
          className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          placeholder="e.g., Elegant Leather Tote"
        />
      </div>

      {/* Grid Layout for Multiple Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            value={initialData?.brand || ''}
            onChange={onInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            placeholder="e.g., LuxeBrand"
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
            value={initialData?.material || ''}
            onChange={onInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            placeholder="e.g., Genuine Leather"
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
            value={initialData?.condition || 'new'}
            onChange={onInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          >
            <option value="new">New</option>
            <option value="second-hand">Second Hand</option>
          </select>
        </div>

        {/* Dimensions */}
        <div>
          <label htmlFor="dimensions" className="block text-sm font-medium text-neutral-900 mb-2">
            Size
          </label>
          <input
            type="text"
            id="dimensions"
            name="dimensions"
            value={initialData?.dimensions || ''}
            onChange={onInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            placeholder="e.g., 30cm x 20cm x 10cm"
          />
        </div>

        {/* Store */}
        <div>
          <label htmlFor="store" className="block text-sm font-medium text-neutral-900 mb-2">
            Store
          </label>
          <input
            type="text"
            id="store"
            name="store"
            value={initialData?.store || ''}
            onChange={onInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            placeholder="e.g., Main Store"
          />
        </div>
      </div>

      {/* Pricing and Inventory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buying Price */}
        <div>
          <label htmlFor="buying_price" className="block text-sm font-medium text-neutral-900 mb-2">
            Buying Price (TSh) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="buying_price"
            name="buying_price"
            required
            step="1"
            min="1"
            value={initialData?.buying_price || ''}
            onChange={onInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            placeholder="e.g., 50000"
          />
          <p className="mt-1 text-xs text-neutral-500">
            Enter buying price to auto-calculate all prices
          </p>
        </div>

        {/* Retail Price */}
        <div>
          <label htmlFor="retail_price" className="block text-sm font-medium text-neutral-900 mb-2">
            Retail Price (TSh) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="retail_price"
            name="retail_price"
            required
            step="1"
            min="1"
            value={initialData?.retail_price || ''}
            onChange={onInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent bg-neutral-50"
            placeholder="Auto-calculated (Buying Price + 12,000)"
            readOnly
          />
          <p className="mt-1 text-xs text-neutral-500">
            Buying Price + TSh 12,000
          </p>
        </div>

        {/* Wholesale Price TZS */}
        <div>
          <label htmlFor="wholesale_price_tzs" className="block text-sm font-medium text-neutral-900 mb-2">
            Wholesale Price (TSh) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="wholesale_price_tzs"
            name="wholesale_price_tzs"
            required
            step="1"
            min="1"
            value={initialData?.wholesale_price_tzs || ''}
            onChange={onInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent bg-neutral-50"
            placeholder="Auto-calculated (Buying Price + 7,000)"
            readOnly
          />
          <p className="mt-1 text-xs text-neutral-500">
            Buying Price + TSh 7,000
          </p>
        </div>

        {/* Wholesale Price USD */}
        <div>
          <label htmlFor="wholesale_price_usd" className="block text-sm font-medium text-neutral-900 mb-2">
            Wholesale Price (USD) <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="wholesale_price_usd"
            name="wholesale_price_usd"
            required
            step="1"
            min="1"
            value={initialData?.wholesale_price_usd || ''}
            onChange={onInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent bg-neutral-50"
            placeholder="Auto-calculated"
            readOnly
          />
          <p className="mt-1 text-xs text-neutral-500">
            (Buying Price + TSh 9,000) / {exchangeRate > 0 ? exchangeRate.toLocaleString() : 'N/A'}, rounded up
          </p>
          {exchangeRate > 0 ? (
            <p className="mt-1 text-xs text-green-600 font-medium">
              Current rate: 1 USD = {exchangeRate.toLocaleString()} TZS
            </p>
          ) : (
            <p className="mt-1 text-xs text-red-600 font-medium">
              Exchange rate unavailable. Cannot calculate USD price.
            </p>
          )}
        </div>

        {/* Stock Status */}
        <div>
          <label htmlFor="stock_status" className="block text-sm font-medium text-neutral-900 mb-2">
            Stock Status
          </label>
          <select
            id="stock_status"
            name="stock_status"
            value={initialData?.stock_status || 'in_stock'}
            onChange={onInputChange}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          >
            <option value="in_stock">In Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center space-x-4 pt-6 border-t border-neutral-200">
        <button
          type="submit"
          disabled={submitting || uploadingImages}
          className="px-6 py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {uploadingImages ? 'Uploading Images...' : submitting ? 'Saving...' : submitButtonText}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
