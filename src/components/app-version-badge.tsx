import { APP_VERSION_LABEL, LAST_PUBLISHED_MS_LABEL } from "@/lib/app-version";

export function AppVersionBadge() {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-0.5 rounded-2xl border border-zinc-800/80 bg-zinc-950/90 px-3 py-2 text-[11px] font-medium tracking-[0.2em] text-zinc-400 shadow-lg shadow-black/20 backdrop-blur">
      <span className="uppercase">{APP_VERSION_LABEL}</span>
      <span className="text-[10px] tracking-[0.14em] text-zinc-500">
        {LAST_PUBLISHED_MS_LABEL}
      </span>
    </div>
  );
}
