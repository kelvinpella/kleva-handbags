

import { motion, AnimatePresence } from "framer-motion";

export default function SlideshowPanel({
  loading,
  error,
  imageUrl,
  brandChangeKey,
  imageIndex,
}: {
  loading: boolean;
  error: string | null;
  imageUrl: string | null;
  brandChangeKey: number;
  imageIndex: number;
}) {
  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center text-neutral-400">
        Loading handbags…
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center text-red-400 px-4 text-center">
        Failed to load handbags: {error}
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="h-full w-full flex items-center justify-center text-neutral-400">
        No images found.
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-black">
      {/* Brand-change overlay sweep (only when brand changes) */}
      <AnimatePresence>
        <motion.div
          key={`sweep-${brandChangeKey}`}
          initial={{ opacity: 0, x: "-120%" }}
          animate={{ opacity: 0.35, x: "120%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,215,120,0.45) 45%, transparent 100%)",
          }}
        />
      </AnimatePresence>

      {/* Image crossfade (changes per imageIndex) */}
      <AnimatePresence mode="wait">
        <motion.img
          key={`img-${brandChangeKey}-${imageIndex}`}
          src={imageUrl}
          alt="Handbag"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{
            opacity: 0,
            scale: 1.03,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            scale: 0.99,
            filter: "blur(6px)",
          }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* Subtle vignette for luxury look */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/45 via-transparent to-black/25" />
    </div>
  );
}