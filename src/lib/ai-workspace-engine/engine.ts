export type ConversationExchange = {
  id: number;
  instruction: string;
  response: string;
};

export type SaveState =
  | "idle"
  | "ready-to-save"
  | "saving"
  | "saved"
  | "save-error";

export type SaveUiState = {
  projectId: string;
  sourceExchangeId: number | null;
  sourceContent: string | null;
  state: SaveState;
  title: string;
  errorMessage: string | null;
  refreshErrorMessage: string | null;
};

const CONVERSATION_CONTEXT_EXCHANGE_LIMIT = 3;

function getBudgetedConversationContext(
  exchanges: ConversationExchange[],
): ConversationExchange[] {
  return exchanges.slice(-CONVERSATION_CONTEXT_EXCHANGE_LIMIT);
}

export function getConversationContextExchangeCount(
  exchanges: ConversationExchange[],
): number {
  return getBudgetedConversationContext(exchanges).length;
}

export function getConversationContextStatusMessage(
  exchanges: ConversationExchange[],
): string {
  const count = getConversationContextExchangeCount(exchanges);

  if (count === 0) {
    return "Next Generate will use no local conversation context.";
  }

  return `Next Generate will use the last ${count} local exchange${count === 1 ? "" : "s"}.`;
}

export function buildGenerationInstruction(
  instruction: string,
  exchanges: ConversationExchange[],
): string {
  const budgetedExchanges = getBudgetedConversationContext(exchanges);

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

export function deriveLatestExchange(
  latestExchangeId: number | null,
  exchanges: ConversationExchange[],
): ConversationExchange | null {
  if (latestExchangeId === null) {
    return null;
  }

  return exchanges.find((exchange) => exchange.id === latestExchangeId) ?? null;
}

export function deriveActiveSaveState(
  projectId: string,
  latestExchange: ConversationExchange | null,
  saveUiState: SaveUiState,
): SaveUiState {
  if (
    saveUiState.projectId === projectId &&
    saveUiState.sourceExchangeId === latestExchange?.id &&
    saveUiState.sourceContent !== null &&
    saveUiState.sourceContent === latestExchange?.response
  ) {
    return saveUiState;
  }

  return {
    projectId,
    sourceExchangeId: latestExchange?.id ?? null,
    sourceContent: latestExchange?.response ?? null,
    state: latestExchange?.response ? "ready-to-save" : "idle",
    title: "",
    errorMessage: null,
    refreshErrorMessage: null,
  };
}

export function getGenerationErrorMessage(status: string): string {
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

export function getSaveErrorMessage(status: string): string {
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
