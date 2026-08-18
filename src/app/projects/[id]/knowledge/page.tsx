"use client";

import { getProjectById } from "@/lib/project/project";
import { getKnowledge } from "@/lib/knowledge/knowledge";
import { getProjectWorkspaceEntry } from "@/lib/project-brain/engine";
import { useParams } from "next/navigation";
import { useMemo } from "react";

type DashboardSnapshot = {
  knowledgeEntries: Array<{
    id: string;
    title: string;
  }> | null;
  isLoaded: boolean;
  errorCode: string | null;
  recoveryMessage: string | null;
};

function createLocalRecoveryKnowledgeSnapshot(projectId: string) {
  try {
    if (!getProjectById(projectId)) {
      return null;
    }

    const knowledgeEntries = getKnowledge(projectId);

    return {
      knowledgeEntries,
      recoveryMessage:
        "Kontekst Project Brain jest niedostępny, więc pokazuję lokalnie zapisane wpisy wiedzy dla tego projektu.",
    };
  } catch {
    return null;
  }
}

export default function ProjectKnowledgePage() {
  const params = useParams<{ id: string }>();
  const dashboard = useMemo<DashboardSnapshot>(() => {
    if (typeof window === "undefined") {
      return {
        knowledgeEntries: null,
        isLoaded: false,
        errorCode: null,
        recoveryMessage: null,
      };
    }

    try {
      const workspaceEntry = getProjectWorkspaceEntry(params.id);

      return {
        knowledgeEntries: workspaceEntry.workspace.knowledgeEntries,
        isLoaded: true,
        errorCode: null,
        recoveryMessage: null,
      };
    } catch (error) {
      const errorCode =
        error instanceof Error && "code" in error && typeof error.code === "string"
          ? error.code
          : "source-read-failed";
      const recoveryKnowledge =
        errorCode === "project-not-found" ||
        errorCode === "context-unavailable"
          ? createLocalRecoveryKnowledgeSnapshot(params.id)
          : null;

      return {
        knowledgeEntries: recoveryKnowledge?.knowledgeEntries ?? null,
        isLoaded: true,
        errorCode: recoveryKnowledge ? null : errorCode,
        recoveryMessage: recoveryKnowledge?.recoveryMessage ?? null,
      };
    }
  }, [params.id]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Wiedza projektu
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">Wiedza</h2>
          <p className="text-sm text-zinc-400">
            Wpisy wiedzy tylko do odczytu dla bieżącej przestrzeni projektu.
          </p>
        </div>

        {dashboard.recoveryMessage ? (
          <div className="rounded-xl border border-amber-900/50 bg-amber-950/30 p-4">
            <p className="text-sm text-amber-200">{dashboard.recoveryMessage}</p>
          </div>
        ) : null}

        {!dashboard.isLoaded ? null : dashboard.knowledgeEntries ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            {dashboard.knowledgeEntries?.length === 0 ? (
              <p className="text-sm text-zinc-400">
                Brak dostępnych wpisów wiedzy.
              </p>
            ) : (
              <div className="space-y-3">
                {dashboard.knowledgeEntries?.map((knowledgeEntry) => (
                  <div
                    key={knowledgeEntry.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                  >
                    <p className="text-base font-medium text-zinc-100">
                      {knowledgeEntry.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
            <p className="text-sm text-zinc-400">
              {dashboard.errorCode === "project-not-found"
              ? "Projekt nie został znaleziony"
              : "Wiedza projektu niedostępna"}
          </p>
        )}
      </div>
    </section>
  );
}
