import Link from 'next/link';
import Image from 'next/image';
import { Handbag } from '@/typings';

interface ProductCardProps {
  handbag: Handbag;
}

export default function ProductCard({ handbag }: ProductCardProps) {
  return (
    <Link href={`/product/${handbag.id}`} className="group">
      <div className="bg-white rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-3/4 bg-gray-100 overflow-hidden">
          <Image
            src={handbag.images[0]}
            alt={handbag.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {handbag.stock_status === 'out_of_stock' && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-white px-4 py-2 text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {handbag.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{handbag.brand}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              TSh {handbag.price.toLocaleString()}
            </span>
            {handbag.condition === 'second-hand' && (
              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                Mtumba
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}