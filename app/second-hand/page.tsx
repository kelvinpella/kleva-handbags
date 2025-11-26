import { getHandbags } from '@/lib/supabase';
import ProductGrid from '@/components/ProductGrid';
import Pagination from '@/components/Pagination';
import { Handbag } from '@/typings';

const ITEMS_PER_PAGE = 12;

export const metadata = {
  title: 'Pochi za Mtumba - Pochi Store',
  description: 'Nunua pochi za mtumba zenye ubora wa hali ya juu kwa bei nafuu',
};

export default async function SecondHandPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const { data, count } = await getHandbags('second-hand', currentPage, ITEMS_PER_PAGE);
  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Pochi za Mtumba</h1>
        <p className="text-gray-600">
          Pata pochi za mtumba zenye ubora wa hali ya juu kwa bei nafuu
        </p>
        <div className="mt-4 text-sm text-gray-500">
          Inaonyesha {data?.length || 0} ya pochi {count || 0}
        </div>
      </div>

      <ProductGrid handbags={(data as Handbag[]) || []} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/second-hand"
        />
      )}
    </div>
  );
}