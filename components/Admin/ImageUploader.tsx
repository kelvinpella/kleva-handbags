'use client';

import { useState } from 'react';
import { uploadMultipleImages } from '@/lib/actions';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

interface ImageUploaderProps {
  onImagesUploaded?: (urls: string[]) => void;
  maxImages?: number;
  condition?: string;
  productId?: string;
}

export default function ImageUploader({ onImagesUploaded, maxImages = 5, condition = 'new', productId }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > maxImages) {
      setError(`You can only upload up to ${maxImages} images`);
      return;
    }

    setUploading(true);
    setError('');

    try {
      const fileArray = Array.from(files);
      // Generate a temporary product ID if not provided
      const tempProductId = productId || uuidv4();
      const urls = await uploadMultipleImages(fileArray, condition, tempProductId);

      if (urls.length > 0) {
        setUploadedUrls(urls);
        onImagesUploaded?.(urls);
      } else {
        setError('Failed to upload images');
      }
    } catch (err) {
      setError('An error occurred during upload');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
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
          PNG, JPG, GIF up to 5MB. Maximum {maxImages} images.
        </p>
      </div>

      {uploading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
          <span className="ml-3 text-neutral-600">Uploading...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      {uploadedUrls.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-900">Uploaded Images:</h3>
          <div className="grid grid-cols-3 gap-4">
            {uploadedUrls.map((url, index) => (
              <div key={index} className="relative aspect-square bg-neutral-100 rounded overflow-hidden">
                <Image
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="bg-neutral-50 p-3 rounded">
            <p className="text-xs font-mono text-neutral-700 break-all">
              {JSON.stringify(uploadedUrls)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}