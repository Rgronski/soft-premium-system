export default function WorkspacePage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-zinc-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header>
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Project Workspace
          </p>

          <h1 className="mt-2 text-4xl font-semibold">
            Soft Premium System
          </h1>

          <p className="mt-2 text-zinc-400">
            Foundation • WF-002
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Project Overview</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Overview of the current project.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Project Brain</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Central knowledge of the project.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Sprint</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Current sprint information.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Backlog</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Planned work and ideas.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Latest project activity.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}