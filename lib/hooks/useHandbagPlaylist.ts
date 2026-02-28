// components/live/useHandbagPlaylist.ts
"use client";

import { Handbag } from "@/typings";
import { useEffect, useMemo, useRef, useState } from "react";

type PlaylistState = {
  handbags: Handbag[];
  loading: boolean;
  error: string | null;

  handbagIndex: number;
  imageIndex: number;

  currentHandbag: Handbag | null;
  currentImageUrl: string | null;

  brandChangeKey: number;
};

export function useHandbagPlaylist(initialHandbags: Handbag[]): PlaylistState {
  const [handbags] = useState<Handbag[]>(initialHandbags ?? []);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const [handbagIndex, setHandbagIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [brandChangeKey, setBrandChangeKey] = useState(1);

  const handbagsRef = useRef<Handbag[]>(handbags);
  handbagsRef.current = handbags;

  // auto-advance every 5 seconds
  useEffect(() => {
    if (!handbags.length) return;

    const interval = window.setInterval(() => {
      const list = handbagsRef.current;
      const current = list[handbagIndex];
      const imgCount = current?.images?.length ?? 0;

      if (imgCount > 0 && imageIndex < imgCount - 1) {
        setImageIndex((i) => i + 1);
        return;
      }

      setHandbagIndex((i) => (i + 1) % list.length);
      setImageIndex(0);
      setBrandChangeKey((k) => k + 1);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [handbags.length, handbagIndex, imageIndex]);

  const currentHandbag = useMemo(() => {
    if (!handbags.length) return null;
    return handbags[Math.min(handbagIndex, handbags.length - 1)] ?? null;
  }, [handbags, handbagIndex]);

  const currentImageUrl = useMemo(() => {
    if (!currentHandbag) return null;
    return currentHandbag.images?.[imageIndex] ?? currentHandbag.images?.[0] ?? null;
  }, [currentHandbag, imageIndex]);

  return {
    handbags,
    loading,
    error,
    handbagIndex,
    imageIndex,
    currentHandbag,
    currentImageUrl,
    brandChangeKey,
  };
}