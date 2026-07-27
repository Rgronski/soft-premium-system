"use client";

import { getBrowserAiProjectContext } from "@/lib/project-brain/browser";
import type { AiProjectContext } from "@/lib/project-brain/types";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type GenerationState = "idle" | "generating" | "generated" | "error";
type SaveState = "idle" | "ready-to-save" | "saving" | "saved" | "save-error";

type ConversationExchange = {
  id: number;
  instruction: string;
  response: string;
};

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
  exchanges: ConversationExchange[];
  latestExchangeId: number | null;
  errorMessage: string | null;
};

type SaveUiState = {
  projectId: string;
  sourceExchangeId: number | null;
  sourceContent: string | null;
  state: SaveState;
  title: string;
  errorMessage: string | null;
  refreshErrorMessage: string | null;
};

type StarterPrompt = {
  id: string;
  label: string;
  instruction: string;
};

const CONVERSATION_CONTEXT_EXCHANGE_LIMIT = 3;

function getConversationContextExchangeCount(
  exchanges: ConversationExchange[],
): number {
  return exchanges.slice(-CONVERSATION_CONTEXT_EXCHANGE_LIMIT).length;
}

function getConversationContextStatusMessage(
  exchanges: ConversationExchange[],
): string {
  const count = getConversationContextExchangeCount(exchanges);

  if (count === 0) {
    return "Next Generate will use no local conversation context.";
  }

  return `Next Generate will use the last ${count} local exchange${count === 1 ? "" : "s"}.`;
}

function buildGenerationInstruction(
  instruction: string,
  exchanges: ConversationExchange[],
): string {
  const budgetedExchanges = exchanges.slice(-CONVERSATION_CONTEXT_EXCHANGE_LIMIT);

  if (budgetedExchanges.length === 0) {
    return instruction;
  }

  const conversationContext = budgetedExchanges
    .map(
      (exchange, index) =>
        [
          `Exchange ${index + 1} - User Instruction:`,
          exchange.instruction,
          `Exchange ${index + 1} - AI Response:`,
          exchange.response,
        ].join("\n"),
    )
    .join("\n\n");

  return [
    "Use the following local conversation context from the current AI Workspace session.",
    "Do not assume any context beyond the exchanges below and the current canonical project context.",
    "",
    conversationContext,
    "",
    "Current User Instruction:",
    instruction,
  ].join("\n");
}

const STARTER_PROMPTS: StarterPrompt[] = [
  {
    id: "summarize-project-state",
    label: "Summarize Project State",
    instruction:
      "Produce a concise summary of the current project state based only on the provided canonical project context.",
  },
  {
    id: "identify-project-risks",
    label: "Identify Project Risks",
    instruction:
      "Identify the most important current project risks based only on the provided canonical project context.",
  },
  {
    id: "review-backlog",
    label: "Review Backlog",
    instruction:
      "Review the current backlog and identify the most relevant unresolved work based only on the provided canonical project context.",
  },
  {
    id: "recommend-next-safe-step",
    label: "Recommend Next Safe Step",
    instruction:
      "Recommend exactly one smallest safe next step based only on the provided canonical project context.",
  },
  {
    id: "review-decisions",
    label: "Review Decisions",
    instruction:
      "Summarize the most relevant existing project decisions and identify any visible unresolved decision gap based only on the provided canonical project context.",
  },
];

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
  const currentProjectIdRef = useRef(params.id);
  const nextExchangeIdRef = useRef(1);
  useLayoutEffect(() => {
    currentProjectIdRef.current = params.id;
  }, [params.id]);
  const [contextState, setContextState] = useState<ContextState>({
    projectId: params.id,
    status: "loading",
  });
  const [instructionState, setInstructionState] = useState({
    projectId: params.id,
    value: "",
    selectedPromptId: null as string | null,
  });
  const [generationUiState, setGenerationUiState] = useState<GenerationUiState>(
    {
      projectId: params.id,
      state: "idle",
      exchanges: [],
      latestExchangeId: null,
      errorMessage: null,
    },
  );
  const [saveUiState, setSaveUiState] = useState<SaveUiState>({
    projectId: params.id,
    sourceExchangeId: null,
    sourceContent: null,
    state: "idle",
    title: "",
    errorMessage: null,
    refreshErrorMessage: null,
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
  const selectedPromptId =
    instructionState.projectId === params.id
      ? instructionState.selectedPromptId
      : null;
  const activeGenerationState =
    generationUiState.projectId === params.id
      ? generationUiState
      : {
          projectId: params.id,
          state: "idle" as const,
          exchanges: [],
          latestExchangeId: null,
          errorMessage: null,
        };
  const latestExchange =
    activeGenerationState.latestExchangeId === null
      ? null
      : activeGenerationState.exchanges.find(
          (exchange) => exchange.id === activeGenerationState.latestExchangeId,
        ) ?? null;
  const conversationContextStatusMessage = getConversationContextStatusMessage(
    activeGenerationState.exchanges,
  );
  const generationInstruction = buildGenerationInstruction(
    instruction,
    activeGenerationState.exchanges,
  );
  const activeSaveState =
    saveUiState.projectId === params.id &&
    saveUiState.sourceExchangeId === latestExchange?.id &&
    saveUiState.sourceContent !== null &&
    saveUiState.sourceContent === latestExchange?.response
      ? saveUiState
      : {
          projectId: params.id,
          sourceExchangeId: latestExchange?.id ?? null,
          sourceContent: latestExchange?.response ?? null,
          state: latestExchange?.response
            ? ("ready-to-save" as const)
            : ("idle" as const),
          title: "",
          errorMessage: null,
          refreshErrorMessage: null,
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

  function setInstructionValue(value: string, promptId: string | null) {
    setInstructionState({
      projectId: params.id,
      value,
      selectedPromptId: promptId,
    });
  }

  function handleResetConversation() {
    nextExchangeIdRef.current = 1;
    setGenerationUiState({
      projectId: params.id,
      state: "idle",
      exchanges: [],
      latestExchangeId: null,
      errorMessage: null,
    });
    setSaveUiState({
      projectId: params.id,
      sourceExchangeId: null,
      sourceContent: null,
      state: "idle",
      title: "",
      errorMessage: null,
      refreshErrorMessage: null,
    });
  }

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (activeGenerationState.state === "generating") {
      return;
    }

    if (!instruction.trim()) {
      setGenerationUiState((currentState) => ({
        projectId: params.id,
        state: "error",
        exchanges:
          currentState.projectId === params.id ? currentState.exchanges : [],
        latestExchangeId:
          currentState.projectId === params.id
            ? currentState.latestExchangeId
            : null,
        errorMessage: "Enter a valid instruction.",
      }));
      return;
    }

    setGenerationUiState((currentState) => ({
      projectId: params.id,
      state: "generating",
      exchanges:
        currentState.projectId === params.id ? currentState.exchanges : [],
      latestExchangeId:
        currentState.projectId === params.id
          ? currentState.latestExchangeId
          : null,
      errorMessage: null,
    }));
    setSaveUiState({
      projectId: params.id,
      sourceExchangeId: null,
      sourceContent: null,
      state: "idle",
      title: "",
      errorMessage: null,
      refreshErrorMessage: null,
    });

    try {
      const response = await fetch(`/api/projects/${params.id}/ai/generate`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          instruction: generationInstruction,
        }),
      });

      const result = (await response.json()) as
        | { status: "generated"; content: string }
        | { status: string };

      if (result.status === "generated" && "content" in result) {
        const exchangeId = nextExchangeIdRef.current;
        nextExchangeIdRef.current += 1;

        const exchange: ConversationExchange = {
          id: exchangeId,
          instruction,
          response: result.content,
        };

        setGenerationUiState((currentState) => ({
          projectId: params.id,
          state: "generated",
          exchanges: [
            ...(currentState.projectId === params.id
              ? currentState.exchanges
              : []),
            exchange,
          ],
          latestExchangeId: exchangeId,
          errorMessage: null,
        }));
        setSaveUiState({
          projectId: params.id,
          sourceExchangeId: exchangeId,
          sourceContent: result.content,
          state: "ready-to-save",
          title: "",
          errorMessage: null,
          refreshErrorMessage: null,
        });
        return;
      }

      setGenerationUiState((currentState) => ({
        projectId: params.id,
        state: "error",
        exchanges:
          currentState.projectId === params.id ? currentState.exchanges : [],
        latestExchangeId:
          currentState.projectId === params.id
            ? currentState.latestExchangeId
            : null,
        errorMessage: getGenerationErrorMessage(result.status),
      }));
    } catch {
      setGenerationUiState((currentState) => ({
        projectId: params.id,
        state: "error",
        exchanges:
          currentState.projectId === params.id ? currentState.exchanges : [],
        latestExchangeId:
          currentState.projectId === params.id
            ? currentState.latestExchangeId
            : null,
        errorMessage: "Unexpected generation error.",
      }));
    }
  }

  async function handleSaveToKnowledge(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (
      activeGenerationState.state !== "generated" ||
      !latestExchange?.response
    ) {
      return;
    }

    if (activeSaveState.state === "saving" || activeSaveState.state === "saved") {
      return;
    }

    if (!activeSaveState.title.trim()) {
      setSaveUiState({
        projectId: params.id,
        sourceExchangeId: latestExchange.id,
        sourceContent: latestExchange.response,
        state: "save-error",
        title: activeSaveState.title,
        errorMessage: "Enter a valid title.",
        refreshErrorMessage: null,
      });
      return;
    }

    const projectId = params.id;
    const generatedContent = latestExchange.response;
    const title = activeSaveState.title;

    setSaveUiState({
      projectId,
      sourceExchangeId: latestExchange.id,
      sourceContent: generatedContent,
      state: "saving",
      title,
      errorMessage: null,
      refreshErrorMessage: null,
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
          sourceExchangeId: latestExchange.id,
          sourceContent: generatedContent,
          state: "saved",
          title,
          errorMessage: null,
          refreshErrorMessage: null,
        });
        try {
          const contextResult = await getBrowserAiProjectContext(projectId);

          if (currentProjectIdRef.current !== projectId) {
            return;
          }

          if (contextResult.status === "available") {
            setContextState({
              projectId,
              status: "available",
              context: contextResult.context,
            });
            return;
          }

          setSaveUiState({
            projectId,
            sourceExchangeId: latestExchange.id,
            sourceContent: generatedContent,
            state: "saved",
            title,
            errorMessage: null,
            refreshErrorMessage: "Saved to Knowledge, but AI project context could not be refreshed.",
          });
        } catch {
          if (currentProjectIdRef.current !== projectId) {
            return;
          }

          setSaveUiState({
            projectId,
            sourceExchangeId: latestExchange.id,
            sourceContent: generatedContent,
            state: "saved",
            title,
            errorMessage: null,
            refreshErrorMessage: "Saved to Knowledge, but AI project context could not be refreshed.",
          });
        }
        return;
      }

      setSaveUiState({
        projectId,
        sourceExchangeId: latestExchange.id,
        sourceContent: generatedContent,
        state: "save-error",
        title,
        errorMessage:
          "status" in result
            ? getSaveErrorMessage(result.status)
            : "Unexpected save error.",
        refreshErrorMessage: null,
      });
    } catch {
      setSaveUiState({
        projectId,
        sourceExchangeId: latestExchange.id,
        sourceContent: generatedContent,
        state: "save-error",
        title,
        errorMessage: "Knowledge save unavailable.",
        refreshErrorMessage: null,
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
              Enter one instruction to add the next local AI exchange.
            </p>
            <p className="text-sm text-zinc-500">
              {conversationContextStatusMessage}
            </p>
          </div>

          <form className="mt-4 space-y-4" onSubmit={handleGenerate}>
            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-100">Starter Prompts</p>
              <div className="space-y-3">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => setInstructionValue(prompt.instruction, prompt.id)}
                    aria-pressed={selectedPromptId === prompt.id}
                    className="block w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-left transition hover:border-zinc-700 aria-pressed:border-zinc-600"
                  >
                    <span className="block text-sm font-medium text-zinc-100">
                      {prompt.label}
                    </span>
                    <span className="mt-2 block text-sm text-zinc-400">
                      {prompt.instruction}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-zinc-100">
                Instruction
              </span>
              <textarea
                value={instruction}
                onChange={(event) =>
                  setInstructionValue(event.target.value, null)
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

          {activeGenerationState.exchanges.length > 0 ? (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                  Conversation
                </p>
                <button
                  type="button"
                  onClick={handleResetConversation}
                  disabled={activeGenerationState.state === "generating"}
                  className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Reset Conversation
                </button>
              </div>

              {activeGenerationState.exchanges.map((exchange) => {
                const isLatestExchange = latestExchange?.id === exchange.id;

                return (
                  <div
                    key={exchange.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
                  >
                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                      Instruction
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-100">
                      {exchange.instruction}
                    </p>

                    <p className="mt-4 text-sm uppercase tracking-[0.2em] text-zinc-400">
                      Result
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-100">
                      {exchange.response}
                    </p>

                    {isLatestExchange ? (
                      <>
                        <form
                          className="mt-4 space-y-4"
                          onSubmit={handleSaveToKnowledge}
                        >
                          <label className="block space-y-2">
                            <span className="text-sm font-medium text-zinc-100">
                              Title
                            </span>
                            <input
                              type="text"
                              value={activeSaveState.title}
                              onChange={(event) =>
                                setSaveUiState({
                                  projectId: params.id,
                                  sourceExchangeId: exchange.id,
                                  sourceContent: exchange.response,
                                  state:
                                    activeSaveState.state === "saved"
                                      ? "saved"
                                      : "ready-to-save",
                                  title: event.target.value,
                                  errorMessage: null,
                                  refreshErrorMessage:
                                    activeSaveState.refreshErrorMessage,
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

                        {activeSaveState.refreshErrorMessage ? (
                          <div className="mt-4 rounded-xl border border-amber-900/60 bg-amber-950/30 px-4 py-3">
                            <p className="text-sm text-amber-200">
                              {activeSaveState.refreshErrorMessage}
                            </p>
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                );
              })}
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
