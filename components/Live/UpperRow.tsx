// components/live/UpperRow.tsx
"use client";

import SlideshowPanel from "./SlideshowPanel";
import MetaPanel from "./MetaPanel";
import { Handbag } from "@/typings";
import { useHandbagPlaylist } from "@/lib/hooks/useHandbagPlaylist";

export default function UpperRow({ initialHandbags }: { initialHandbags: Handbag[] }) {
  const state = useHandbagPlaylist(initialHandbags);

  return (
    <div className="h-full w-full p-3">
      <div className="h-full w-full rounded-2xl overflow-hidden border border-neutral-800 p-px">
        <div className="w-full h-full grid grid-cols-5 grid-rows-1 bg-neutral-950 rounded-2xl ">
          <div className="col-span-3 max-h-full w-full border-r border-neutral-800">
            <SlideshowPanel
              loading={state.loading}
              error={state.error}
              imageUrl={state.currentImageUrl}
              brandChangeKey={state.brandChangeKey}
              imageIndex={state.imageIndex}
            />
          </div>
          <div className="col-span-2">
            <MetaPanel
              loading={state.loading}
              error={state.error}
              handbag={state.currentHandbag}
              brandChangeKey={state.brandChangeKey}
            />
          </div>
        </div>
      </div>
    </div>
  );
}