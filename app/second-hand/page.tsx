import { getHandbags } from '@/lib/supabase';
import ProductGrid from '@/components/ProductGrid';
import Pagination from '@/components/Pagination';
import ScrollToTop from '@/components/ScrollToTop';
import { Handbag } from '@/typings';

const ITEMS_PER_PAGE = 12;

export const metadata = {
  title: 'Pochi za Mtumba - Pochi Store',
  description: 'Nunua pochi za mtumba zenye ubora wa hali ya juu kwa bei nafuu',
};

interface SearchParams {
  page?: string;
}

export default async function SecondHandPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await Promise.resolve(searchParams);
  const currentPage = Number(params.page) || 1;
  
  const { data, count } = await getHandbags('second-hand', currentPage, ITEMS_PER_PAGE);
  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, count || 0);

  return (
    <>
      <ScrollToTop />
      <div className="bg-white min-h-screen">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8 pb-6 border-b border-neutral-200">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Pochi za Mtumba</h1>
            <p className="text-neutral-600 text-sm">
              Pata pochi za mtumba zenye ubora wa hali ya juu kwa bei nafuu
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-neutral-500">
                {count && count > 0 ? (
                  <>
                    Inaonyesha <span className="font-medium text-neutral-900">{startItem}-{endItem}</span> ya{' '}
                    <span className="font-medium text-neutral-900">{count}</span> bidhaa
                  </>
                ) : (
                  'Hakuna bidhaa'
                )}
              </div>
              {totalPages > 1 && (
                <div className="text-sm text-neutral-500">
                  Ukurasa <span className="font-medium text-neutral-900">{currentPage}</span> wa{' '}
                  <span className="font-medium text-neutral-900">{totalPages}</span>
                </div>
              )}
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
      </div>
    </>
  );
}