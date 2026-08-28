import Link from "next/link";
import type { ReactNode } from "react";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Przestrzeń robocza projektu
            </p>

            <h1 className="text-4xl font-semibold">Przestrzeń robocza</h1>

            <p className="text-zinc-400">
              Przejdź między sekcjami projektu.
            </p>
          </div>

          <div>
            <Link
              href="/"
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Powrót do strony głównej
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <nav className="space-y-2">
              <p className="px-3 pb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                Sekcje
              </p>

              <Link
                href={`/projects/${id}`}
                className="block rounded-xl px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                Przegląd
              </Link>

              <Link
                href={`/projects/${id}/ai`}
                className="block rounded-xl px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                Przestrzeń AI
              </Link>

              <Link
                href={`/projects/${id}/project-map`}
                className="block rounded-xl px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                Mapa projektu
              </Link>

              <Link
                href={`/projects/${id}/tasks`}
                className="block rounded-xl px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                Zadania
              </Link>

              <Link
                href={`/projects/${id}/clients`}
                className="block rounded-xl px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                Klienci
              </Link>

              <Link
                href={`/projects/${id}/calendar`}
                className="block rounded-xl px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                Kalendarz
              </Link>

              <Link
                href={`/projects/${id}/services`}
                className="block rounded-xl px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                Usługi
              </Link>

              <Link
                href={`/projects/${id}/visits`}
                className="block rounded-xl px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                Wizyty
              </Link>

              <Link
                href={`/projects/${id}/invoices`}
                className="block rounded-xl px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                Faktury
              </Link>

              <Link
                href={`/projects/${id}/settings`}
                className="block rounded-xl px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                Ustawienia
              </Link>
            </nav>
          </aside>

          <div>{children}</div>
        </div>
      </div>
    </main>
  );
}
