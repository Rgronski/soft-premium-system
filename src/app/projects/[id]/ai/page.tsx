"use client";

import { getBrowserAiProjectContext } from "@/lib/project-brain/browser";
import { createKnowledgeEntry } from "@/lib/knowledge/knowledge";
import {
  createTaskOnServer,
  getTasksFromServer,
} from "@/lib/task/browser-server";
import {
  buildGenerationInstruction,
  type ContextUiState,
  deriveActiveGenerationState,
  deriveGenerationErrorState,
  deriveGenerationSuccessState,
  deriveGenerationStartState,
  deriveActiveInstructionState,
  deriveCopyResponseIntentState,
  deriveResetConversationContextState,
  deriveResetSaveState,
  deriveSelectedStarterPromptInstructionState,
  derivePromptOrchestrationInstructionState,
  deriveConversationContextState,
  deriveGenerateActionPresentation,
  deriveResetActionPresentation,
  deriveSaveActionPresentation,
  deriveSaveErrorState,
  deriveSaveReadyState,
  deriveSaveSavingState,
  deriveSaveSuccessState,
  deriveSaveTitleChangeState,
  deriveContextLoadState,
  deriveActiveSaveState,
  deriveLatestExchange,
  STARTER_PROMPTS,
  getGenerationErrorMessage,
  getSaveErrorMessage,
  type ConversationExchange,
  type GenerationUiState,
  type InstructionUiState,
  type SaveUiState,
} from "@/lib/ai-workspace-engine/engine";
import type { AiProjectContext } from "@/lib/project-brain/types";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const CODEXA_HANDOFF_COPY_TEXT = `===== HANDOFF DO CODEXA START =====
Session Identity:
Repository:
Cel:
Zakres:
Dozwolone pliki:
Zakazane pliki:
Weryfikacja:
Zasady pracy:
- oszczędzaj tokeny i kredyty
- diagnozuj przed edycją
- stosuj minimalny patch
- nie refaktoruj przy okazji
- nie rozszerzaj scope
- nie commituj ani nie pushuj bez trybu publikacji
- raportuj w bloku do skopiowania
- nie przechodź na SOL bez decyzji Product Ownera
===== HANDOFF DO CODEXA END =====`;

type KnowledgeSaveResponse =
  | {
      id: string;
      projectId: string;
      title: string;
      content: string;
      createdAt: string;
    }
  | { status: string };

type MemoryTaskFeedbackState =
  | {
      type: "success";
      message: string;
    }
  | {
      type: "error";
      message: string;
    }
  | null;

function buildTaskFromMemoryTitle(
  projectName: string,
  knowledgeEntry: {
    title: string;
    content: string;
  },
): string {
  const trimmedTitle = knowledgeEntry.title.trim();

  if (trimmedTitle) {
    return `Memory follow-up: ${trimmedTitle}`;
  }

  const trimmedExcerpt = knowledgeEntry.content.trim().replace(/\s+/g, " ");

  if (trimmedExcerpt) {
    return `Memory follow-up: ${trimmedExcerpt.slice(0, 60).trimEnd()}`;
  }

  return `Memory follow-up: ${projectName}`;
}

function isSavedKnowledgeEntry(
  value: KnowledgeSaveResponse,
): value is Extract<KnowledgeSaveResponse, { id: string }> {
  return (
    "id" in value &&
    "projectId" in value &&
    "title" in value &&
    "content" in value &&
    "createdAt" in value
  );
}

function mergeSavedKnowledgeEntryIntoContext(
  context: AiProjectContext,
  savedKnowledgeEntry: {
    id: string;
    title: string;
    content: string;
  },
): AiProjectContext {
  return {
    ...context,
    knowledgeEntries: [
      ...context.knowledgeEntries.filter(
        (entry) => entry.id !== savedKnowledgeEntry.id,
      ),
      {
        id: savedKnowledgeEntry.id,
        title: savedKnowledgeEntry.title,
        content: savedKnowledgeEntry.content,
      },
    ],
  };
}

async function recoverProjectForKnowledgeSave(
  projectId: string,
  projectName: string,
): Promise<boolean> {
  try {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
      }),
    });

    return response.status === 201;
  } catch {
    return false;
  }
}

export default function ProjectAiWorkspacePage() {
  const params = useParams<{ id: string }>();
  const currentProjectIdRef = useRef(params.id);
  const nextExchangeIdRef = useRef(1);
  useLayoutEffect(() => {
    currentProjectIdRef.current = params.id;
  }, [params.id]);
  const [contextState, setContextState] = useState<ContextUiState>({
    projectId: params.id,
    status: "loading",
  });
  const [instructionState, setInstructionState] = useState<InstructionUiState>({
    projectId: params.id,
    value: "",
    selectedPromptId: null,
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
  const [memoryTaskFeedback, setMemoryTaskFeedback] =
    useState<MemoryTaskFeedbackState>(null);
  const [isCreatingTaskFromMemory, setIsCreatingTaskFromMemory] =
    useState(false);
  const [projectTasks, setProjectTasks] = useState<AiProjectContext["tasks"]>(
    [],
  );
  const [isProjectTasksLoading, setIsProjectTasksLoading] = useState(true);
  const [isHandoffCopied, setIsHandoffCopied] = useState(false);

  useEffect(() => {
    let ignore = false;

    void getBrowserAiProjectContext(params.id).then((result) => {
      if (ignore) {
        return;
      }

      if (result.status === "available") {
        setContextState(deriveContextLoadState(params.id, result));
        return;
      }

      setContextState(deriveContextLoadState(params.id, result));
    });

    return () => {
      ignore = true;
    };
  }, [params.id]);

  useEffect(() => {
    let ignore = false;

    async function loadProjectTasks() {
      setIsProjectTasksLoading(true);

      try {
        const loadedTasks = await getTasksFromServer(params.id);

        if (ignore) {
          return;
        }

        setProjectTasks(
          loadedTasks.map((task) => ({
            id: task.id,
            title: task.title,
          })),
        );
      } catch {
        if (!ignore) {
          setProjectTasks([]);
        }
      } finally {
        if (!ignore) {
          setIsProjectTasksLoading(false);
        }
      }
    }

    void loadProjectTasks();

    return () => {
      ignore = true;
    };
  }, [params.id]);

  const activeInstructionState = deriveActiveInstructionState(
    params.id,
    instructionState,
  );
  const instruction = activeInstructionState.value;
  const selectedPromptId = activeInstructionState.selectedPromptId;
  const activeGenerationState = deriveActiveGenerationState(
    params.id,
    generationUiState,
  );
  const conversationContextState = deriveConversationContextState(
    params.id,
    generationUiState,
  );
  const generateActionPresentation = deriveGenerateActionPresentation(
    activeGenerationState.state,
  );
  const resetActionPresentation = deriveResetActionPresentation(
    activeGenerationState.state,
    activeGenerationState.exchanges,
  );
  const latestExchange = deriveLatestExchange(
    activeGenerationState.latestExchangeId,
    activeGenerationState.exchanges,
  );
  const generationInstruction = buildGenerationInstruction(
    instruction,
    conversationContextState.exchanges,
  );
  const activeSaveState = deriveActiveSaveState(
    params.id,
    latestExchange,
    saveUiState,
  );
  const saveActionPresentation = deriveSaveActionPresentation(
    activeSaveState.state,
  );

  if (contextState.projectId !== params.id || contextState.status === "loading") {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Przestrzeń AI
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Ładowanie kontekstu AI projektu...
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
            Przestrzeń AI
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Projekt nie został znaleziony.
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
            Przestrzeń AI
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            Kontekst AI projektu jest niedostępny.
          </h2>
        </div>
      </section>
    );
  }

  if (contextState.status !== "available") {
    return null;
  }

  const context = contextState.context;
  const latestKnowledgeEntry =
    context.knowledgeEntries[context.knowledgeEntries.length - 1] ?? null;

  function setInstructionValue(value: string, promptId: string | null) {
    setInstructionState(
      derivePromptOrchestrationInstructionState(params.id, value, promptId),
    );
  }

  function handleResetConversation() {
    const resetConversationState = deriveResetConversationContextState(
      params.id,
    );

    nextExchangeIdRef.current = 1;
    setGenerationUiState(resetConversationState.generationUiState);
    setSaveUiState(deriveResetSaveState(params.id));
  }

  async function handleGenerate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (activeGenerationState.state === "generating") {
      return;
    }

    const projectId = params.id;

    if (!instruction.trim()) {
      setGenerationUiState((currentState) =>
        deriveGenerationErrorState(projectId, currentState, "Enter a valid instruction."),
      );
      return;
    }

    setGenerationUiState((currentState) =>
      deriveGenerationStartState(projectId, currentState),
    );
    setSaveUiState(deriveResetSaveState(projectId));

    try {
      const response = await fetch(`/api/projects/${projectId}/ai/generate`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          instruction: generationInstruction,
          projectContext: context,
        }),
      });

      const result = (await response.json()) as
        | { status: "generated"; content: string }
        | { status: string };

      if (currentProjectIdRef.current !== projectId) {
        return;
      }

      if (result.status === "generated" && "content" in result) {
        const exchangeId = nextExchangeIdRef.current;
        nextExchangeIdRef.current += 1;

        const exchange: ConversationExchange = {
          id: exchangeId,
          instruction,
          response: result.content,
        };

        setGenerationUiState((currentState) =>
          deriveGenerationSuccessState(
            projectId,
            currentState,
            exchange,
            exchangeId,
          ),
        );
        setSaveUiState(deriveSaveReadyState(projectId, exchange));
        return;
      }

      setGenerationUiState((currentState) =>
        deriveGenerationErrorState(
          projectId,
          currentState,
          getGenerationErrorMessage(result.status),
        ),
      );
    } catch {
      if (currentProjectIdRef.current !== projectId) {
        return;
      }

      setGenerationUiState((currentState) =>
        deriveGenerationErrorState(
          projectId,
          currentState,
          "Unexpected generation error.",
        ),
      );
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
      setSaveUiState(
        deriveSaveErrorState(
          params.id,
          latestExchange,
          activeSaveState.title,
          "Enter a valid title.",
        ),
      );
      return;
    }

    const projectId = params.id;
    const generatedContent = latestExchange.response;
    const title = activeSaveState.title;

    setSaveUiState(deriveSaveSavingState(projectId, latestExchange, title));

    try {
      const postKnowledge = async () =>
        fetch(`/api/projects/${projectId}/knowledge`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            title,
            content: generatedContent,
          }),
        });

      let response = await postKnowledge();
      let result = (await response.json()) as KnowledgeSaveResponse;

      if (
        response.status === 404 &&
        "status" in result &&
        result.status === "project-not-found" &&
        (await recoverProjectForKnowledgeSave(projectId, context.projectName))
      ) {
        if (currentProjectIdRef.current !== projectId) {
          return;
        }

        response = await postKnowledge();
        result = (await response.json()) as KnowledgeSaveResponse;
      }

      if (
        response.status === 404 &&
        "status" in result &&
        result.status === "project-not-found"
      ) {
        const localKnowledgeEntry = createKnowledgeEntry(
          projectId,
          title,
          generatedContent,
        );

        if (localKnowledgeEntry) {
          if (currentProjectIdRef.current !== projectId) {
            return;
          }

          setSaveUiState(
            deriveSaveSuccessState(projectId, latestExchange, title),
          );
          setContextState((currentState) => {
            if (
              currentState.projectId !== projectId ||
              currentState.status !== "available"
            ) {
              return currentState;
            }

            return {
              projectId,
              status: "available",
              context: mergeSavedKnowledgeEntryIntoContext(
                currentState.context,
                localKnowledgeEntry,
              ),
            };
          });
          return;
        }
      }

      if (response.status === 201 && isSavedKnowledgeEntry(result)) {
        if (currentProjectIdRef.current !== projectId) {
          return;
        }

        setSaveUiState(deriveSaveSuccessState(projectId, latestExchange, title));
        setContextState((currentState) => {
          if (
            currentState.projectId !== projectId ||
            currentState.status !== "available"
          ) {
            return currentState;
          }

          return {
            projectId,
            status: "available",
            context: mergeSavedKnowledgeEntryIntoContext(
              currentState.context,
              result,
            ),
          };
        });
        return;
      }

      setSaveUiState(
        deriveSaveErrorState(
          projectId,
          latestExchange,
          title,
          "status" in result
            ? getSaveErrorMessage(result.status)
            : "Unexpected save error.",
        ),
      );
    } catch {
      setSaveUiState(
        deriveSaveErrorState(
          projectId,
          latestExchange,
          title,
          "Knowledge save unavailable.",
        ),
      );
    }
  }

  async function handleCreateTaskFromMemory() {
    if (!latestKnowledgeEntry || isCreatingTaskFromMemory) {
      return;
    }

    const projectId = params.id;
    const taskTitle = buildTaskFromMemoryTitle(
      context.projectName,
      latestKnowledgeEntry,
    );

    setIsCreatingTaskFromMemory(true);
    setMemoryTaskFeedback(null);

    try {
      const createdTask = await createTaskOnServer({
        projectId,
        title: taskTitle,
      });

      if (currentProjectIdRef.current === projectId) {
        setProjectTasks((currentTasks) =>
          currentTasks.some((task) => task.id === createdTask.id)
            ? currentTasks
            : [
                ...currentTasks,
                {
                  id: createdTask.id,
                  title: createdTask.title,
                },
              ],
        );
      }

      setMemoryTaskFeedback({
        type: "success",
        message: `Created task from memory: ${taskTitle}`,
      });

      const refreshedTasks = await getTasksFromServer(projectId);

      if (currentProjectIdRef.current !== projectId) {
        return;
      }

      setProjectTasks((currentTasks) =>
        refreshedTasks.reduce<AiProjectContext["tasks"]>(
          (mergedTasks, task) =>
            mergedTasks.some((currentTask) => currentTask.id === task.id)
              ? mergedTasks
              : [
                  ...mergedTasks,
                  {
                    id: task.id,
                    title: task.title,
                  },
                ],
          currentTasks,
        ),
      );
    } catch {
      if (currentProjectIdRef.current !== projectId) {
        return;
      }

      setMemoryTaskFeedback({
        type: "error",
        message: "Task creation from memory failed.",
      });
    } finally {
      if (currentProjectIdRef.current === projectId) {
        setIsCreatingTaskFromMemory(false);
      }
    }
  }

  async function handleCopyResponse(response: string) {
    const copyResponseIntentState = deriveCopyResponseIntentState(
      params.id,
      response,
    );

    await navigator.clipboard.writeText(copyResponseIntentState.response);
  }

  async function handleCopyHandoff() {
    try {
      await navigator.clipboard?.writeText?.(CODEXA_HANDOFF_COPY_TEXT);
    } catch {
      // Clipboard may be unavailable in test or runtime environments.
    } finally {
      setIsHandoffCopied(true);
    }
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Przestrzeń AI
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">
            {context.projectName}
          </h2>
        </div>

        <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/30 p-4">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">
            Ostatnio odzyskana pamięć
          </p>
          {latestKnowledgeEntry ? (
            <div className="mt-3 space-y-2">
              <p className="text-base font-medium text-zinc-50">
                {`Ostatnia pamięć: ${latestKnowledgeEntry.title}`}
              </p>
              <p className="whitespace-pre-wrap text-sm text-zinc-200">
                {`Fragment kontekstu: ${
                  latestKnowledgeEntry.content.length > 160
                    ? `${latestKnowledgeEntry.content.slice(0, 160).trimEnd()}...`
                    : latestKnowledgeEntry.content
                }`}
              </p>
              <button
                type="button"
                onClick={() => {
                  void handleCreateTaskFromMemory();
                }}
                disabled={isCreatingTaskFromMemory}
                className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-50 transition hover:border-emerald-300 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreatingTaskFromMemory
                  ? "Tworzenie zadania..."
                  : "Utwórz zadanie z pamięci"}
              </button>
              {memoryTaskFeedback ? (
                <p
                  className={`text-sm ${
                    memoryTaskFeedback.type === "error"
                      ? "text-red-200"
                      : "text-emerald-100/80"
                  }`}
                >
                  {memoryTaskFeedback.message}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="mt-3 text-sm text-emerald-100/80">
              Brak jeszcze odzyskanej pamięci.
            </p>
          )}
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Zadania
            </p>
            {isProjectTasksLoading ? (
              <p className="mt-4 text-sm text-zinc-500">Ładowanie zadań...</p>
            ) : projectTasks.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">Brak zadań.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {projectTasks.map((task) => (
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
              Wiedza
            </p>
            {context.knowledgeEntries.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">
                Brak wpisów wiedzy.
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
              Generowanie
            </p>
            <p className="text-sm text-zinc-400">
              Wpisz jedną instrukcję, aby dodać następną lokalną wymianę AI.
            </p>
            <p className="text-sm text-zinc-500">
              AI Workspace korzysta z Project Brain. Przypięte repo nie
              przekazuje jeszcze plików repo do promptu AI.
            </p>
            <p className="text-sm text-zinc-500">
              {conversationContextState.statusMessage}
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              AI Workbench
            </p>
            <div className="mt-3 space-y-2 text-sm text-zinc-300">
              <p>Rozmowa robocza korzysta z kontekstu projektu.</p>
              <p>Codex nadal pracuje przez handoff do skopiowania.</p>
              <p>
                Project Brain dostarcza kontekst, a Konduktor wskazuje następny
                bezpieczny krok.
              </p>
              <p className="text-zinc-500">
                Gotowy wynik możesz skopiować przyciskiem Kopiuj przy
                odpowiedzi.
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                Handoff do Codexa
              </p>
              <pre className="mt-4 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-3 text-xs leading-6 text-zinc-200">
                {`SPS OS przygotowuje kontekst projektu i blok przekazania.
Codex wykonuje tylko zaakceptowany zakres poza aplikacją.
Poniższy szablon możesz skopiować i uzupełnić przed wysłaniem.

===== HANDOFF DO CODEXA START =====
Session Identity:
Repository:
Cel:
Zakres:
Dozwolone pliki:
Zakazane pliki:
Weryfikacja:
Zasady pracy:
- oszczędzaj tokeny i kredyty
- diagnozuj przed edycją
- stosuj minimalny patch
- nie refaktoruj przy okazji
- nie rozszerzaj scope
- nie commituj ani nie pushuj bez trybu publikacji
- raportuj w bloku do skopiowania
- nie przechodź na SOL bez decyzji Product Ownera
===== HANDOFF DO CODEXA END =====`}
              </pre>
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    void handleCopyHandoff();
                  }}
                  className="rounded-xl border border-zinc-700 bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-950"
                >
                  {isHandoffCopied ? "Skopiowano" : "Kopiuj handoff"}
                </button>
              </div>
              <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-3 text-xs leading-5 text-zinc-400">
                <p>Session Identity pobierz z aktywnego SPS OS session/bootstrap.</p>
                <p>Repository to repozytorium SPS OS.</p>
                <p>Zakres i Weryfikacja bierz z zatwierdzonego kontraktu milestone.</p>
                <p>SPS OS nie uzupelnia tych pol automatycznie na tym etapie.</p>
              </div>
              <div className="mt-3 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-3 text-xs leading-5 text-zinc-400">
                <p className="font-medium text-zinc-300">Manualne wypelnianie</p>
                <p>Session Identity kopiuj z bootstrapu aktywnej sesji SPS OS.</p>
                <p>Repository wpisz jako sciezke repozytorium SPS OS.</p>
                <p>Cel bierz z celu zatwierdzonego milestone.</p>
                <p>Zakres bierz z zatwierdzonego scope.</p>
                <p>Dozwolone pliki i Zakazane pliki bierz z handoffu lub kontraktu.</p>
                <p>Weryfikacja bierz z planu weryfikacji.</p>
              </div>
            </div>
          </div>

          <form className="mt-4 space-y-4" onSubmit={handleGenerate}>
            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-100">Propozycje startowe</p>
              <div className="space-y-3">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() =>
                      setInstructionState(
                        deriveSelectedStarterPromptInstructionState(
                          params.id,
                          prompt,
                        ),
                      )
                    }
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
                Instrukcja
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
              disabled={generateActionPresentation.disabled}
              className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {generateActionPresentation.label}
            </button>
          </form>

          {resetActionPresentation.visible ? (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between gap-3">
                  <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                  Rozmowa
                </p>
                <button
                  type="button"
                  onClick={handleResetConversation}
                  disabled={resetActionPresentation.disabled}
                  className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resetActionPresentation.label}
                </button>
              </div>

              {conversationContextState.exchanges.map((exchange) => {
                const isLatestExchange = latestExchange?.id === exchange.id;

                return (
                  <div
                    key={exchange.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3"
                  >
                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                      Instrukcja
                    </p>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-zinc-100">
                      {exchange.instruction}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
                        Wynik
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          void handleCopyResponse(exchange.response);
                        }}
                        className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-medium text-zinc-100"
                      >
                        Kopiuj
                      </button>
                    </div>
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
                              Tytuł
                            </span>
                            <input
                              type="text"
                              value={activeSaveState.title}
                              onChange={(event) =>
                                setSaveUiState(
                                  deriveSaveTitleChangeState(
                                    params.id,
                                    exchange,
                                    activeSaveState,
                                    event.target.value,
                                  ),
                                )
                              }
                              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
                            />
                          </label>

                          <button
                            type="submit"
                            disabled={saveActionPresentation.disabled}
                            className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {saveActionPresentation.label}
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
