"use client";

import { useState, useTransition } from "react";
import { incrementSale, decrementSale } from "@/lib/actions";

interface SalesCounterProps {
  productId: string;
  productName: string;
  productCondition: "new" | "second-hand";
  buyingPrice: number;
  sellingPrice: number;
  initialItemsSold: number;
}

export default function SalesCounter({
  productId,
  productName,
  productCondition,
  buyingPrice,
  sellingPrice,
  initialItemsSold,
}: SalesCounterProps) {
  const [itemsSold, setItemsSold] = useState(initialItemsSold);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"increment" | "decrement">("increment");
  const [quantity, setQuantity] = useState("1");

  const openDialog = (type: "increment" | "decrement") => {
    setDialogType(type);
    setQuantity("1");
    setError(null);
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setQuantity("1");
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(quantity);

    if (isNaN(qty) || qty <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    if (dialogType === "decrement" && qty > itemsSold) {
      setError(`Cannot return more than ${itemsSold} items`);
      return;
    }

    startTransition(async () => {
      setError(null);

      const action = dialogType === "increment" ? incrementSale : decrementSale;
      const result = await action({
        productId,
        productName,
        productCondition,
        buyingPrice,
        sellingPrice,
        quantity: qty,
      });

      if (result.success) {
        if (dialogType === "increment") {
          setItemsSold((prev) => prev + qty);
        } else {
          setItemsSold((prev) => Math.max(0, prev - qty));
        }
        closeDialog();
      } else {
        setError(result.error || "Failed to process request");
      }
    });
  };

  return (
    <>
      <div className="relative">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => openDialog("decrement")}
            disabled={isPending || itemsSold <= 0}
            className="w-7 h-7 flex items-center justify-center rounded bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Return items"
          >
            <span className="text-neutral-700 font-medium">−</span>
          </button>

          <span className="text-sm font-medium text-neutral-900 min-w-[2rem] text-center">
            {itemsSold}
          </span>

          <button
            onClick={() => openDialog("increment")}
            disabled={isPending}
            className="w-7 h-7 flex items-center justify-center rounded bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Record sale"
          >
            <span className="text-neutral-700 font-medium">+</span>
          </button>
        </div>
      </div>

      {/* Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              {dialogType === "increment" ? "Record Sale" : "Return Items"}
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              {dialogType === "increment"
                ? `Record items sold for ${productName}`
                : `Record items returned for ${productName}`}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={dialogType === "decrement" ? itemsSold : undefined}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  autoFocus
                  disabled={isPending}
                />
                {dialogType === "decrement" && (
                  <p className="text-xs text-neutral-500 mt-1">
                    Maximum: {itemsSold} items
                  </p>
                )}
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={closeDialog}
                  disabled={isPending}
                  className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 px-4 py-2 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-50"
                >
                  {isPending
                    ? "Processing..."
                    : dialogType === "increment"
                    ? "Record Sale"
                    : "Record Return"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
