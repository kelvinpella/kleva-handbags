import { getHandbags } from '@/lib/supabase';
import ProductGrid from '@/components/ProductGrid';
import Pagination from '@/components/Pagination';
import ScrollToTop from '@/components/ScrollToTop';
import { Handbag } from '@/typings';
import { ITEMS_PER_PAGE } from '@/lib/constants';

export const metadata = {
  title: 'New Handbags - Kleva Handbags',
  description: 'Shop modern new handbags at affordable prices',
};

interface SearchParams {
  page?: string;
}

export default async function NewHandbagsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await Promise.resolve(searchParams);
  const currentPage = Number(params.page) || 1;
  
  const { data, count } = await getHandbags('new', currentPage, ITEMS_PER_PAGE);
  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, count || 0);


  return (
    <>
      <ScrollToTop />
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8 pb-6 border-b border-neutral-200">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">New Handbags</h1>
            <p className="italic">
              ( Pochi Mpya )
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-neutral-500">
                {count && count > 0 ? (
                  <>
                    Showing <span className="font-medium text-neutral-900">{startItem}-{endItem}</span> of{' '}
                    <span className="font-medium text-neutral-900">{count}</span> items
                  </>
                ) : (
                  'No items available'
                )}
              </div>
              {totalPages > 1 && (
                <div className="text-sm text-neutral-500">
                  Page <span className="font-medium text-neutral-900">{currentPage}</span> of{' '}
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
              basePath="/new"
            />
          )}
        </div>
      </div>
    </>
  );
}