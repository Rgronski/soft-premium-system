"use client";

import { getBrowserAiProjectContext } from "@/lib/project-brain/browser";
import type { AiProjectContext } from "@/lib/project-brain/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type GenerationState = "idle" | "generating" | "generated" | "error";
type SaveState = "idle" | "ready-to-save" | "saving" | "saved" | "save-error";

type ContextState =
  | {
      projectId: string;
      status: "loading";
    }
  | {
      projectId: string;
      status: "available";
      context: AiProjectContext;
    }
  | {
      projectId: string;
      status: "project-not-found" | "unavailable";
    };

type GenerationUiState = {
  projectId: string;
  state: GenerationState;
  generatedContent: string | null;
  errorMessage: string | null;
};

type SaveUiState = {
  projectId: string;
  sourceContent: string | null;
  state: SaveState;
  title: string;
  errorMessage: string | null;
};

function getGenerationErrorMessage(status: string): string {
  switch (status) {
    case "invalid-request":
    case "invalid-instruction":
      return "Enter a valid instruction.";
    case "project-not-found":
      return "Project not found.";
    case "context-unavailable":
      return "AI project context unavailable.";
    case "provider-unavailable":
      return "AI provider unavailable.";
    case "generation-failed":
    case "internal-error":
      return "Generation failed.";
    default:
      return "Unexpected generation error.";
  }
}

function getSaveErrorMessage(status: string): string {
  switch (status) {
    case "invalid-request":
      return "Enter a valid title.";
    case "project-not-found":
      return "Project not found.";
    case "context-unavailable":
      return "Knowledge save unavailable.";
    default:
      return "Unexpected save error.";
  }
}

export default function ProjectAiWorkspacePage() {
  const params = useParams<{ id: string }>();
  const [contextState, setContextState] = useState<ContextState>({
    projectId: params.id,
    status: "loading",
  });
  const [instructionState, setInstructionState] = useState({
    projectId: params.id,
    value: "",
  });
  const [generationUiState, setGenerationUiState] = useState<GenerationUiState>(
    {
      projectId: params.id,
      state: "idle",
      generatedContent: null,
      errorMessage: null,
    },
  );
  const [saveUiState, setSaveUiState] = useState<SaveUiState>({
    projectId: params.id,
    sourceContent: null,
    state: "idle",
    title: "",
    errorMessage: null,
  });

  useEffect(() => {
    let ignore = false;

    void getBrowserAiProjectContext(params.id).then((result) => {
      if (ignore) {
        return;
      }

      if (result.status === "available") {
        setContextState({
          projectId: params.id,
          status: "available",
          context: result.context,
        });
        return;
      }

      if (result.status === "project-not-found") {
        setContextState({
          projectId: params.id,
          status: "project-not-found",
        });
        return;
      }

      setContextState({
        projectId: params.id,
        status: "unavailable",
      });
    });

    return () => {
      ignore = true;
    };
  }, [params.id]);

  const instruction =
    instructionState.projectId === params.id ? instructionState.value : "";
  const activeGenerationState =
    generationUiState.projectId === params.id
      ? generationUiState
      : {
          projectId: params.id,
          state: "idle" as const,
          generatedContent: null,
          errorMessage: null,
        };
  const activeSaveState =
    saveUiState.projectId === params.id &&
    saveUiState.sourceContent !== null &&
    saveUiState.sourceContent === activeGenerationState.generatedContent
      ? saveUiState
      : {
          projectId: params.id,
          sourceContent: activeGenerationState.generatedContent,
          state: activeGenerationState.generatedContent
            ? ("ready-to-save" as const)
            : ("idle" as const),
          title: "",
          errorMessage: null,
        };

  if (contextState.projectId !== params.id || contextState.status === "loading") {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            AI Workspace
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Loading AI project context...
          </h2>
        </div>
      </section>
    );
  }

  if (contextState.status === "project-not-found") {
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

  if (contextState.status === "unavailable") {
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

  if (contextState.status !== "available") {
    return null;
  }

  const context = contextState.context;

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (activeGenerationState.state === "generating") {
      return;
    }

    if (!instruction.trim()) {
      setGenerationUiState({
        projectId: params.id,
        state: "error",
        generatedContent: null,
        errorMessage: "Enter a valid instruction.",
      });
      return;
    }

    setGenerationUiState({
      projectId: params.id,
      state: "generating",
      generatedContent: null,
      errorMessage: null,
    });
    setSaveUiState({
      projectId: params.id,
      sourceContent: null,
      state: "idle",
      title: "",
      errorMessage: null,
    });

    try {
      const response = await fetch(`/api/projects/${params.id}/ai/generate`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          instruction,
        }),
      });

      const result = (await response.json()) as
        | { status: "generated"; content: string }
        | { status: string };

      if (result.status === "generated" && "content" in result) {
        setGenerationUiState({
          projectId: params.id,
          state: "generated",
          generatedContent: result.content,
          errorMessage: null,
        });
        setSaveUiState({
          projectId: params.id,
          sourceContent: result.content,
          state: "ready-to-save",
          title: "",
          errorMessage: null,
        });
        return;
      }

      setGenerationUiState({
        projectId: params.id,
        state: "error",
        generatedContent: null,
        errorMessage: getGenerationErrorMessage(result.status),
      });
    } catch {
      setGenerationUiState({
        projectId: params.id,
        state: "error",
        generatedContent: null,
        errorMessage: "Unexpected generation error.",
      });
    }
  }

  async function handleSaveToKnowledge(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      activeGenerationState.state !== "generated" ||
      !activeGenerationState.generatedContent
    ) {
      return;
    }

    if (activeSaveState.state === "saving" || activeSaveState.state === "saved") {
      return;
    }

    if (!activeSaveState.title.trim()) {
      setSaveUiState({
        projectId: params.id,
        sourceContent: activeGenerationState.generatedContent,
        state: "save-error",
        title: activeSaveState.title,
        errorMessage: "Enter a valid title.",
      });
      return;
    }

    const projectId = params.id;
    const generatedContent = activeGenerationState.generatedContent;
    const title = activeSaveState.title;

    setSaveUiState({
      projectId,
      sourceContent: generatedContent,
      state: "saving",
      title,
      errorMessage: null,
    });

    try {
      const response = await fetch(`/api/projects/${projectId}/knowledge`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: generatedContent,
        }),
      });

      const result = (await response.json()) as
        | {
            id: string;
            projectId: string;
            title: string;
            content: string;
            createdAt: string;
          }
        | { status: string };

      if (
        response.status === 201 &&
        "id" in result &&
        "projectId" in result &&
        "title" in result &&
        "content" in result &&
        "createdAt" in result
      ) {
        setSaveUiState({
          projectId,
          sourceContent: generatedContent,
          state: "saved",
          title,
          errorMessage: null,
        });
        return;
      }

      setSaveUiState({
        projectId,
        sourceContent: generatedContent,
        state: "save-error",
        title,
        errorMessage:
          "status" in result
            ? getSaveErrorMessage(result.status)
            : "Unexpected save error.",
      });
    } catch {
      setSaveUiState({
        projectId,
        sourceContent: generatedContent,
        state: "save-error",
        title,
        errorMessage: "Knowledge save unavailable.",
      });
    }
  }

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

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Generation
            </p>
            <p className="text-sm text-zinc-400">
              Enter one instruction to generate a single AI response.
            </p>
          </div>

          <form className="mt-4 space-y-4" onSubmit={handleGenerate}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-zinc-100">
                Instruction
              </span>
              <textarea
                value={instruction}
                onChange={(event) =>
                  setInstructionState({
                    projectId: params.id,
                    value: event.target.value,
                  })
                }
                rows={4}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
              />
            </label>

            <button
              type="submit"
              disabled={activeGenerationState.state === "generating"}
              className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {activeGenerationState.state === "generating"
                ? "Generating..."
                : "Generate"}
            </button>
          </form>

          {activeGenerationState.state === "generated" &&
          activeGenerationState.generatedContent ? (
            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Result
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-100">
                {activeGenerationState.generatedContent}
              </p>

              <form className="mt-4 space-y-4" onSubmit={handleSaveToKnowledge}>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-zinc-100">Title</span>
                  <input
                    type="text"
                    value={activeSaveState.title}
                    onChange={(event) =>
                      setSaveUiState({
                        projectId: params.id,
                        sourceContent: activeGenerationState.generatedContent,
                        state:
                          activeSaveState.state === "saved"
                            ? "saved"
                            : "ready-to-save",
                        title: event.target.value,
                        errorMessage: null,
                      })
                    }
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
                  />
                </label>

                <button
                  type="submit"
                  disabled={
                    activeSaveState.state === "saving" ||
                    activeSaveState.state === "saved"
                  }
                  className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {activeSaveState.state === "saving"
                    ? "Saving..."
                    : activeSaveState.state === "saved"
                      ? "Saved"
                      : "Save to Knowledge"}
                </button>
              </form>

              {activeSaveState.errorMessage ? (
                <div className="mt-4 rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3">
                  <p className="text-sm text-red-200">
                    {activeSaveState.errorMessage}
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}

          {activeGenerationState.state === "error" &&
          activeGenerationState.errorMessage ? (
            <div className="mt-4 rounded-xl border border-red-900/60 bg-red-950/30 px-4 py-3">
              <p className="text-sm text-red-200">
                {activeGenerationState.errorMessage}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
