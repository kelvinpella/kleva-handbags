import { Handbag } from '@/typings';
import ProductCard from './ProductCard';

interface ProductGridProps {
  handbags: Handbag[];
}

export default function ProductGrid({ handbags }: ProductGridProps) {
  if (handbags.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-600 text-lg">Hakuna pochi zinazopatikana kwa sasa</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
      {handbags.map((handbag) => (
        <ProductCard key={handbag.id} handbag={handbag} />
      ))}
    </div>
  );
}