import Link from "next/link";
import Image from "next/image";
import {
  PRODUCT_CONDITIONS,
  CONDITION_LABELS,
  ITEMS_PER_PAGE,
} from "@/lib/constants";
import { fetchProducts } from "@/lib/actions";
import Pagination from "@/components/Pagination";
import ProductsClient from "./ProductsClient";
import DeleteButton from "./DeleteButton";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProductsListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await Promise.resolve(searchParams);
  const currentPage = Number(params.page) || 1;
  const filter = (params.filter as "all" | "new" | "second-hand") || "all";
  const searchQuery = (params.search as string) || "";

  const result = await fetchProducts(
    filter,
    currentPage,
    ITEMS_PER_PAGE,
    searchQuery
  );

  const products = result.data || [];
  const totalCount = result.count || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startItem = totalCount > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalCount);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Products</h1>
          <p className="text-neutral-600 mt-2">
            Manage your handbag inventory ({totalCount} products)
          </p>
        </div>
        <Link
          href="/admin/products/add"
          className="px-6 py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors font-medium inline-flex items-center space-x-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add Product</span>
        </Link>
      </div>

      {/* Client-side filters and search */}
      <ProductsClient currentFilter={filter} currentSearch={searchQuery} />

      {/* Error Message */}
      {!result.success && result.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-800 font-medium">{result.error}</p>
          </div>
        </div>
      )}

      {/* Products Count */}
      {totalCount > 0 && (
        <div className="mb-4 text-sm text-neutral-600">
          Showing {startItem} - {endItem} of {totalCount} products
        </div>
      )}

      {/* Products Table */}
      {products.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-lg p-12 text-center">
          <svg
            className="w-16 h-16 text-neutral-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            No products found
          </h3>
          <p className="text-neutral-600 mb-6">
            {searchQuery
              ? "Try adjusting your search or filters"
              : "Get started by adding your first product"}
          </p>
          {!searchQuery && (
            <Link
              href="/admin/products/add"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add Your First Product</span>
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Price (TSh)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Condition
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Store
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              loading="lazy"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0 max-w-sm flex-1">
                            <p className="w-full font-medium text-neutral-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-neutral-600 truncate">
                              {product.material}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-900">
                        {product.brand}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                        {product.retail_price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap px-2 py-1 text-xs font-medium rounded ${
                            product.condition === PRODUCT_CONDITIONS.NEW
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {
                            CONDITION_LABELS[
                              product.condition as keyof typeof CONDITION_LABELS
                            ]
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex whitespace-nowrap px-2 py-1 text-xs font-medium rounded ${
                            product.stock_status === "in_stock"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.stock_status === "in_stock"
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-900">
                        {product.store || "-"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <DeleteButton productId={product.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/admin/products?filter=${filter}${
                searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""
              }`}
            />
          )}
        </>
      )}
    </div>
  );
}
