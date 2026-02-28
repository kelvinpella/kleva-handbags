// components/live/LiveUpperRow.tsx
"use client";

import { Handbag } from "@/typings";
import LiveCanvas from "./LiveCanvas";
import TitleBar from "./TitleBar";
import UpperRow from "./UpperRow";

export default function LiveUpperRow({
  initialHandbags,
}: {
  initialHandbags: Handbag[];
}) {
  return (
    <LiveCanvas>
      <div className="min-h-full w-full grid grid-rows-[auto_1fr] grid-flow-row grid-cols-1">
        <TitleBar title="Kleva Pochi Kali Kariakoo" />

        {/* CONTENT AREA BELOW TITLE */}
        <div className="w-full h-full grid grid-cols-1 grid-rows-[40%_1fr] grid-flow-row ">
          {/* TOP: 40% (slideshow + metadata) */}

          <UpperRow initialHandbags={initialHandbags} />

          {/* BOTTOM: 60% (placeholder for AI Photoshop area) */}
          <div className="h-full p-3">
            <div className="h-full w-full rounded-xl border border-neutral-800 bg-neutral-950 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-neutral-200 font-semibold tracking-wide">
                  AI Photoshop Area (Placeholder)
                </div>
                <div className="mt-2 text-neutral-500 text-sm">
                  Viewers’ photos + handbag overlay will appear here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LiveCanvas>
  );
}
