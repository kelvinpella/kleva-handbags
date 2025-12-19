import Link from "next/link";
import Image from "next/image";
import { Handbag } from "@/typings";
import PricingSection from "./PricingSection";

interface ProductCardProps {
  handbag: Handbag;
}

export default function ProductCard({ handbag }: ProductCardProps) {
  return (
    <Link
      href={`/product/${handbag.id}`}
      className="group block border border-neutral-200"
    >
      <div className="bg-white overflow-hidden">
        {/* Click to view more colors text */}
        <div className="w-full text-center py-1.5 px-2 bg-neutral-200">
          <p className="text-xs text-neutral-700 font-bold">
            Click image to view more colors
          </p>
          <p className="text-xs text-neutral-600 italic">
            ( Bofya picha kuona rangi zaidi )
          </p>
        </div>
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
        <div className="px-3 flex flex-col divide-y divide-neutral-200">
          <div className="pb-3">
            <p className="text-xs text-neutral-600 uppercase tracking-wide">
              {handbag.brand}
            </p>
            <h3 className="text-sm text-neutral-900 line-clamp-2 font-normal">
              {handbag.name}
            </h3>
          </div>
          {/* Pricing Section */}
          <div className="pb-3">
            <PricingSection
              retailPrice={27000}
              wholesalePriceTZS={24000}
              wholesalePriceUSD={10.0}
            />
          </div>{" "}
        </div>
      </div>
    </Link>
  );
}
