import Link from "next/link";

export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header>
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Przestrzeń robocza projektu
          </p>

          <h1 className="mt-2 text-4xl font-semibold">Soft Premium System</h1>

          <div className="mt-6">
            <Link
              href="/"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              ← Powrót do strony głównej
            </Link>
          </div>

          <p className="mt-2 text-zinc-400">Foundation • WF-002</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Przegląd projektu</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Przegląd bieżącego projektu.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Project Brain</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Centralna wiedza o projekcie.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Sprint</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Informacje o bieżącym sprincie.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Backlog</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Zaplanowana praca i pomysły.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Ostatnia aktywność</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Najnowsza aktywność projektu.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
