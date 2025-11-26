
import { Handbag } from '@/typings';
import ProductCard from './ProductCard';

interface ProductGridProps {
  handbags: Handbag[];
}

export default function ProductGrid({ handbags }: ProductGridProps) {
  if (handbags.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Hakuna pochi zinazopatikana kwa sasa</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {handbags.map((handbag) => (
        <ProductCard key={handbag.id} handbag={handbag} />
      ))}
    </div>
  );
}