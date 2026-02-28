export default function TitleBar({ title }: { title: string }) {
  return (
    <div className="relative px-4 py-4 border-b border-amber-200/20 bg-black">
      {/* subtle gold glow line top */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-24 h-0.5 bg-linear-to-r from-transparent via-amber-300 to-transparent opacity-70" />

        <h1 className="text-center whitespace-nowrap text-base font-semibold tracking-[0.28em] uppercase bg-linear-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
          {title}
        </h1>

      {/* decorative divider */}
      <div className="mt-3 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-amber-200/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
        <span className="h-px w-10 bg-amber-200/40" />
      </div>
    </div>
  );
}
