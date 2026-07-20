"use client";

import { getAiProjectContext } from "@/lib/project-brain/engine";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function ProjectAiWorkspacePage() {
  const params = useParams<{ id: string }>();
  const aiProjectContextResult = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return getAiProjectContext(params.id);
  }, [params.id]);

  if (!aiProjectContextResult) {
    return null;
  }

  if (aiProjectContextResult.status === "project-not-found") {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            AI Workspace
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Project not found.
          </h2>
        </div>
      </section>
    );
  }

  if (aiProjectContextResult.status === "unavailable") {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            AI Workspace
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            AI project context unavailable.
          </h2>
        </div>
      </section>
    );
  }

  const { context } = aiProjectContextResult;

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            AI Workspace
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            {context.projectName}
          </h2>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Tasks
            </p>
            {context.tasks.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">No tasks available.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {context.tasks.map((task) => (
                  <li
                    key={task.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100"
                  >
                    {task.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Knowledge Entries
            </p>
            {context.knowledgeEntries.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">
                No knowledge entries available.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {context.knowledgeEntries.map((knowledgeEntry) => (
                  <details
                    key={knowledgeEntry.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
                  >
                    <summary className="cursor-pointer text-sm font-medium text-zinc-100">
                      {knowledgeEntry.title}
                    </summary>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-300">
                      {knowledgeEntry.content}
                    </p>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
