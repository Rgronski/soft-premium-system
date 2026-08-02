"use client";

import { getProjectWorkspaceEntry } from "@/lib/project-brain/engine";
import { useParams } from "next/navigation";
import { useMemo } from "react";

type DashboardSnapshot = {
  workspaceEntry: ReturnType<typeof getProjectWorkspaceEntry> | null;
  isLoaded: boolean;
  errorCode: string | null;
};

export default function ProjectKnowledgePage() {
  const params = useParams<{ id: string }>();
  const dashboard = useMemo<DashboardSnapshot>(() => {
    if (typeof window === "undefined") {
      return {
        workspaceEntry: null,
        isLoaded: false,
        errorCode: null,
      };
    }

    try {
      return {
        workspaceEntry: getProjectWorkspaceEntry(params.id),
        isLoaded: true,
        errorCode: null,
      };
    } catch (error) {
      const errorCode =
        error instanceof Error && "code" in error && typeof error.code === "string"
          ? error.code
          : "source-read-failed";

      return {
        workspaceEntry: null,
        isLoaded: true,
        errorCode,
      };
    }
  }, [params.id]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Project Knowledge
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">Knowledge</h2>
          <p className="text-sm text-zinc-400">
            Read-only knowledge entries for the current project workspace.
          </p>
        </div>

        {!dashboard.isLoaded ? null : dashboard.workspaceEntry ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            {dashboard.workspaceEntry.workspace.knowledgeEntries.length === 0 ? (
              <p className="text-sm text-zinc-400">
                No knowledge entries available.
              </p>
            ) : (
              <div className="space-y-3">
                {dashboard.workspaceEntry.workspace.knowledgeEntries.map(
                  (knowledgeEntry) => (
                    <div
                      key={knowledgeEntry.id}
                      className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                    >
                      <p className="text-base font-medium text-zinc-100">
                        {knowledgeEntry.title}
                      </p>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-zinc-400">
            {dashboard.errorCode === "project-not-found"
              ? "Project not found"
              : "Project knowledge unavailable"}
          </p>
        )}
      </div>
    </section>
  );
}
