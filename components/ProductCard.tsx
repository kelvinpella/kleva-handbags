import Link from "next/link";
import Image from "next/image";
import { Handbag } from "@/typings";

interface ProductCardProps {
  handbag: Handbag;
}

export default function ProductCard({ handbag }: ProductCardProps) {
  return (
    <Link href={`/product/${handbag.id}`} className="group block border border-neutral-200">
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
          {/* Click to view more colors text */}
          <div className="absolute bottom-0 left-0 right-0 text-center py-1.5 px-2 bg-neutral-200">
            <p className="text-xs text-neutral-700 font-bold">
              Click image to view more colors
            </p>
            <p className="text-xs text-neutral-600 italic">
              ( Bofya picha kuona rangi zaidi )
            </p>
          </div>
        </div>

        {/* Product Info, Retail, and Wholesale Sections */}
        <div className="flex flex-col divide-y divide-neutral-200 px-3">
          {/* Product Info */}
          <div className="pb-2">
            <p className="text-xs text-neutral-600 uppercase tracking-wide">
              {handbag.brand}
            </p>
            <h3 className="text-sm text-neutral-900 line-clamp-2 font-normal">
              {handbag.name}
            </h3>
          </div>

          {/* Retail Price */}
          <div className="py-2">
            <p className="text-sm uppercase font-medium">
              Retail <span className="italic text-xs capitalize">( Rejareja )</span>
            </p>
            <p className="text-sm font-bold text-red-600 pl-4">
              TSh. 27,000
            </p>
          </div>

          {/* Wholesale Price */}
          <div className="pt-2">
            <p className="text-sm uppercase font-medium">
              Wholesale <span className="italic text-xs capitalize">( Jumla )</span>
            </p>
            <div className="space-y-0.5 pl-4">
              <p className="text-sm font-bold text-red-600">
                TSh. 24,000
              </p>
              <p className="text-sm font-bold text-red-600">
                USD 10.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
