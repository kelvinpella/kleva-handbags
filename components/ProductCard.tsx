import Link from "next/link";
import Image from "next/image";
import { Handbag } from "@/typings";

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
            loading="lazy"
            className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
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
              TSh {handbag.selling_price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
