interface PricingSectionProps {
  retailPrice: number;
  wholesalePriceTZS: number;
  wholesalePriceUSD: number;
}

export default function PricingSection({
  retailPrice,
  wholesalePriceTZS,
  wholesalePriceUSD
}: PricingSectionProps) {
  return (
    <div className="flex flex-col divide-y divide-neutral-200 border-neutral-200">
      {/* Retail Price */}
      <div className="py-3">
        <p className="text-sm uppercase font-medium">
          Retail <span className="italic text-xs capitalize">( Rejareja )</span>
        </p>
        <p className="text-base font-bold text-red-600 pl-4">
          TSh. {retailPrice.toLocaleString('en-US')}
        </p>
      </div>

      {/* Wholesale Price */}
      <div className="py-3">
        <p className="text-sm uppercase font-medium">
          Wholesale <span className="italic text-xs capitalize">( Jumla )</span>
        </p>
        <div className="space-y-0.5 pl-4">
          <p className="text-base font-bold text-red-600">
            TSh. {wholesalePriceTZS.toLocaleString('en-US')}
          </p>
          <p className="text-base font-bold text-red-600">
            USD ${wholesalePriceUSD}
          </p>
        </div>
      </div>
    </div>
  );
}
