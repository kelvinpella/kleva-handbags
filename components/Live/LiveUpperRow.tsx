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
        <div className="w-full h-full grid grid-cols-1 grid-rows-[270_1fr] grid-flow-row ">
          {/* TOP: 40% (slideshow + metadata) */}

          <UpperRow initialHandbags={initialHandbags} />

          {/* BOTTOM: 60% (Poster-style Photoshop placeholder) */}
          <div className="h-full p-3">
            <div className="h-full w-full rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden relative">
              {/* subtle luxury glow */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(255,215,120,0.08),transparent_60%)]" />
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-amber-300/60 to-transparent" />

              <div className="relative h-full w-full p-6 flex flex-col text-center">
                {/* MAIN STATEMENT */}
                <div className="text-[20px] font-bold tracking-wide text-amber-200 leading-snug">
                  Maktaba kuu ya pochi Tanzania
                </div>

                {/* Divider */}
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-amber-200/40" />
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  <span className="h-px w-10 bg-amber-200/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end bottom */}
      </div>
    </LiveCanvas>
  );
}
