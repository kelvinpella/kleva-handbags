// components/live/MetaPanel.tsx


import { Handbag } from "@/typings";
import { motion, AnimatePresence } from "framer-motion";

function formatPrice(v: number | string) {
  if (v === null || v === undefined) return "";
  const n = typeof v === "string" ? Number(v) : v;
  if (!Number.isFinite(n)) return String(v);
  return `${n.toLocaleString("en-US")}`;
}

export default function MetaPanel({
  loading,
  error,
  handbag,
  brandChangeKey,
}: {
  loading: boolean;
  error: string | null;
  handbag: Handbag | null;
  brandChangeKey: number;
}) {
  if (loading) {
    return (
      <div className="h-full w-full p-4 flex items-center justify-center text-neutral-400">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full p-4 flex items-center justify-center text-red-400 text-center">
        Error
      </div>
    );
  }

  if (!handbag) {
    return (
      <div className="h-full w-full p-4 flex items-center justify-center text-neutral-400">
        No data
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-neutral-950 p-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={`meta-${brandChangeKey}`}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="h-full rounded-xl border border-neutral-800 bg-linear-to-b from-neutral-900/40 to-neutral-950/40 p-3 relative overflow-hidden"
        >
          {/* shimmer */}
          <motion.div
            key={`shimmer-${brandChangeKey}`}
            initial={{ opacity: 0, x: "-140%" }}
            animate={{ opacity: 0.22, x: "140%" }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,215,120,0.35) 50%, transparent 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col h-full">
            <div className="text-[18px] font-semibold text-neutral-100 leading-tight line-clamp-2">
              {handbag.brand}
            </div>

            <div className="mt-2 text-[22px] font-bold text-amber-200 tracking-wide">
              {formatPrice(handbag.retail_price)}
            </div>

            <div className="mt-auto">
              <div className="rounded-lg border border-amber-200/20 bg-black/30 p-2 text-center">
                <div className="text-[12px] text-neutral-200 font-semibold">
                  TIZAMA POCHI ZAIDI
                </div>
                <div className="text-[16px] font-bold text-amber-200 tracking-wider">
                  KWENYE PAGE
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}