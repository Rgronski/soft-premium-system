import { APP_VERSION } from "@/lib/app-version";
import { getCoreDoctrineBootstrapStatus } from "@/lib/knowledge/core-doctrine";
import { HomeContent } from "@/components/home/home-content";

export default async function Home() {
  const coreDoctrineStatus = await getCoreDoctrineBootstrapStatus();

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
            Soft Premium System
          </p>

          <div className="space-y-1">
            <h1 className="text-4xl font-semibold tracking-tight">
              Witaj ponownie, Radek
            </h1>
            <p className="text-sm text-zinc-400">
              Przestrzeń robocza v{APP_VERSION}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
                  Wiedza główna SPS OS
                </p>
                <h2 className="text-xl font-semibold text-zinc-50">
                  To nie jest wiedza konkretnego projektu
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-zinc-300">
                  Globalna wiedza główna SPS OS jest oddzielona od Project Brain
                  projektu i zapisuje się w wspólnym magazynie runtime.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Status
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-100">
                    {coreDoctrineStatus.status === "available"
                      ? "Dostępna"
                      : "Niedostępna"}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Ścieżka
                  </p>
                  <p className="mt-2 break-all text-sm font-medium text-zinc-100">
                    {coreDoctrineStatus.storePath}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                    Liczba wpisów
                  </p>
                  <p className="mt-2 text-sm font-medium text-zinc-100">
                    {coreDoctrineStatus.entryCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HomeContent />
      </div>
    </main>
  );
}
