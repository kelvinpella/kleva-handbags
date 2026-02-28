// components/live/LiveUpperRow.tsx
"use client";

import { Handbag } from "@/typings";
import LiveCanvas from "./LiveCanvas";
import TitleBar from "./TitleBar";
import UpperRow from "./UpperRow";
import Image from "next/image";
import PlaceholderEdit from "../../public/before-after-placehoder.png";

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
              {/* subtle poster-like glow */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(255,215,120,0.12),transparent_55%)]" />
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-amber-300/70 to-transparent" />

              <div className="relative h-full w-full p-4 flex flex-col">
                {/* Header */}
                <div className="text-center">

                  <div className="text-neutral-100 font-semibold text-[16px]">
                    Tukuvishe pochi kwa AI? Comment <span className="text-amber-200 font-bold">POCHI</span>
                  </div>
                  <div className="mt-1 text-neutral-400 text-[12px]">
                    Tuma picha yako — tukuvishe pochi uipendayo kwa AI
                  </div>
                </div>
                <div className="w-full relative ">
                  <Image src={PlaceholderEdit} alt="Edited images placehoder"  className="w-full mx-auto mt-4" />
                </div>
              </div>
            </div>
          </div>
          {/* end bottom */}
        </div>
      </div>
    </LiveCanvas>
  );
}
