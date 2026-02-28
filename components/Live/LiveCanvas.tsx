

import { PropsWithChildren } from "react";

export default function LiveCanvas({ children }: PropsWithChildren) {
  return (
    <div className="w-full max-w-[420px]">
      {/* 9:16 frame */}
      <div className="mx-auto aspect-9/16 w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
        {children}
      </div>
    </div>
  );
}