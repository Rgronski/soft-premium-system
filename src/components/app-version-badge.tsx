import { APP_VERSION_LABEL } from "@/lib/app-version";

export function AppVersionBadge() {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 rounded-full border border-zinc-800/80 bg-zinc-950/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 shadow-lg shadow-black/20 backdrop-blur">
      {APP_VERSION_LABEL}
    </div>
  );
}
