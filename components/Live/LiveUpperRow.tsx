// components/live/LiveUpperRow.tsx
"use client";

import { Handbag } from "@/typings";
import LiveCanvas from "./LiveCanvas";
import TitleBar from "./TitleBar";
import UpperRow from "./UpperRow";

export default function LiveUpperRow({ initialHandbags }: { initialHandbags: Handbag[] }) {
  return (
    <LiveCanvas>
      <div className="h-full w-full flex flex-col">
        <TitleBar title="Kleva Pochi Kali Kariakoo" />
        <div className="flex-1">
          <UpperRow initialHandbags={initialHandbags} />
        </div>
      </div>
    </LiveCanvas>
  );
}