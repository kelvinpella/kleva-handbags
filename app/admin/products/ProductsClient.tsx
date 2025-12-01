"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { PRODUCT_CONDITIONS } from "@/lib/constants";
import { deleteProduct as deleteProductAction } from "@/lib/actions";

interface ProductsClientProps {
  currentFilter: "all" | "new" | "second-hand";
  currentSearch: string;
}

export default function ProductsClient({
  currentFilter,
  currentSearch,
}: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(currentSearch);

  const handleFilterChange = (newFilter: "all" | "new" | "second-hand") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", newFilter);
    params.delete("page"); // Reset to page 1 when filter changes
    router.push(`/admin/products?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    params.delete("page"); // Reset to page 1 when search changes
    router.push(`/admin/products?${params.toString()}`);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          />
          <svg
            className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              currentFilter === "all"
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange(PRODUCT_CONDITIONS.NEW)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              currentFilter === PRODUCT_CONDITIONS.NEW
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            New
          </button>
          <button
            onClick={() => handleFilterChange(PRODUCT_CONDITIONS.SECOND_HAND)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              currentFilter === PRODUCT_CONDITIONS.SECOND_HAND
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            Second Hand
          </button>
        </div>
      </div>
    </div>
  );
}
