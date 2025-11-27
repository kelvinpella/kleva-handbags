'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative group">
          <div className="relative aspect-3/4 bg-neutral-100 overflow-hidden">
            <Image
              src={images[selectedImage]}
              alt={`${productName} - Image ${selectedImage + 1}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Fullscreen Icon Button */}
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="absolute top-3 right-3 w-10 h-10 bg-white hover:bg-neutral-100 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
            aria-label="View in fullscreen"
            title="Tazama picha kwa ukubwa"
          >
            <svg
              className="w-5 h-5 text-neutral-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          </button>
        </div>

        {/* Thumbnail Images */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square bg-neutral-100 overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-neutral-900'
                    : 'border-transparent hover:border-neutral-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 15vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        currentIndex={selectedImage}
        onNavigate={setSelectedImage}
        productName={productName}
      />
    </>
  );
}