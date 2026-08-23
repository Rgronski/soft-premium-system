"use client";

import { getProjectById } from "@/lib/project/project";
import { getKnowledge } from "@/lib/knowledge/knowledge";
import { getBrowserAiProjectContext } from "@/lib/project-brain/browser";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [dashboard, setDashboard] = useState<DashboardSnapshot>({
    knowledgeEntries: null,
    isLoaded: false,
    errorCode: null,
    recoveryMessage: null,
  });

  useEffect(() => {
    let isActive = true;

    async function loadKnowledgeEntries() {
      try {
        const browserContext = await getBrowserAiProjectContext(params.id);

        if (!isActive) {
          return;
        }

        if (browserContext.status === "available") {
          setDashboard({
            knowledgeEntries: browserContext.context.knowledgeEntries,
            isLoaded: true,
            errorCode: null,
            recoveryMessage: null,
          });
          return;
        }

        const errorCode = browserContext.status;
        const recoveryKnowledge =
          errorCode === "project-not-found" ||
          errorCode === "unavailable"
            ? createLocalRecoveryKnowledgeSnapshot(params.id)
            : null;

        setDashboard({
          knowledgeEntries: recoveryKnowledge?.knowledgeEntries ?? null,
          isLoaded: true,
          errorCode: recoveryKnowledge ? null : errorCode,
          recoveryMessage: recoveryKnowledge?.recoveryMessage ?? null,
        });
      } catch {
        if (!isActive) {
          return;
        }

        const recoveryKnowledge = createLocalRecoveryKnowledgeSnapshot(params.id);

        setDashboard({
          knowledgeEntries: recoveryKnowledge?.knowledgeEntries ?? null,
          isLoaded: true,
          errorCode: recoveryKnowledge ? null : "source-read-failed",
          recoveryMessage: recoveryKnowledge?.recoveryMessage ?? null,
        });
      }
    }

    void loadKnowledgeEntries();

    return () => {
      isActive = false;
    };
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
