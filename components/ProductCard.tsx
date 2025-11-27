import Link from 'next/link';
import Image from 'next/image';
import { Handbag } from '@/typings';

interface ProductCardProps {
  handbag: Handbag;
}

export default function ProductCard({ handbag }: ProductCardProps) {
  return (
    <Link href={`/product/${handbag.id}`} className="group block">
      <div className="bg-white overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-3/4 bg-neutral-100 overflow-hidden mb-3">
          <Image
            src={handbag.images[0]}
            alt={handbag.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* Wishlist button */}
          <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow opacity-0 group-hover:opacity-100">
            <svg
              className="w-5 h-5 text-neutral-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Badges */}
          {handbag.stock_status === 'out_of_stock' && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
              <span className="bg-neutral-900 text-white px-4 py-2 text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
          
          {handbag.condition === 'second-hand' && (
            <div className="absolute top-3 left-3">
              <span className="bg-neutral-900 text-white px-3 py-1 text-xs font-bold">
                MTUMBA
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <p className="text-xs text-neutral-600 uppercase tracking-wide">
            {handbag.brand}
          </p>
          <h3 className="text-sm text-neutral-900 line-clamp-2 font-normal">
            {handbag.name}
          </h3>
          <div className="flex items-baseline space-x-2 pt-1">
            <span className="text-base font-bold text-red-600">
              TSh {handbag.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}