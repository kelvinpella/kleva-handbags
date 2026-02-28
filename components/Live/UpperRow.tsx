

import SlideshowPanel from "./SlideshowPanel";
import MetaPanel from "./MetaPanel";
import { useHandbagPlaylist } from "@/lib/hooks/useHandbagPlaylist";
import { Handbag } from "@/typings";

export default function UpperRow({ initialHandbags }: { initialHandbags: Handbag[] }) {
  const state = useHandbagPlaylist(initialHandbags);

  return (
    <div className="h-full w-full p-3">
      <div className="h-full w-full rounded-xl border border-neutral-800 overflow-hidden">
        <div className="h-full grid grid-cols-5 bg-neutral-950">
          <div className="col-span-3 border-r border-neutral-800">
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