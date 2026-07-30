import {
  buildGenerationInstruction,
  deriveActiveGenerationState,
  deriveGenerationErrorState,
  deriveGenerationSuccessState,
  deriveGenerationStartState,
  deriveActiveInstructionState,
  deriveManualInstructionChangeState,
  deriveSelectedStarterPromptInstructionState,
  deriveGenerateActionPresentation,
  deriveResetActionPresentation,
  deriveResetGenerationState,
  deriveResetSaveState,
  deriveSaveActionPresentation,
  deriveSaveErrorState,
  deriveSaveRefreshWarningState,
  deriveSaveSavingState,
  deriveSaveSuccessState,
  deriveActiveSaveState,
  deriveLatestExchange,
  type GenerationUiState,
  type InstructionUiState,
  getConversationContextExchangeCount,
  getConversationContextStatusMessage,
  getGenerationErrorMessage,
  getSaveErrorMessage,
  type ConversationExchange,
  type SaveUiState,
  type StarterPromptUiState,
} from "./engine";
import { describe, expect, test } from "vitest";

function createExchange(
  id: number,
  instruction: string,
  response: string,
): ConversationExchange {
  return {
    id,
    instruction,
    response,
  };
}

function createSaveUiState(
  overrides: Partial<SaveUiState> = {},
): SaveUiState {
  return {
    projectId: "project-1",
    sourceExchangeId: 1,
    sourceContent: "Response 1",
    state: "ready-to-save",
    title: "Architecture note",
    errorMessage: "Existing error",
    refreshErrorMessage: "Existing refresh error",
    ...overrides,
  };
}

function createGenerationUiState(
  overrides: Partial<GenerationUiState> = {},
): GenerationUiState {
  return {
    projectId: "project-1",
    state: "generated",
    exchanges: [createExchange(1, "Instruction 1", "Response 1")],
    latestExchangeId: 1,
    errorMessage: null,
    ...overrides,
  };
}

function createInstructionUiState(
  overrides: Partial<InstructionUiState> = {},
): InstructionUiState {
  return {
    projectId: "project-1",
    value: "Summarize project",
    selectedPromptId: "summarize-project-state",
    ...overrides,
  };
}

function createStarterPromptUiState(
  overrides: Partial<StarterPromptUiState> = {},
): StarterPromptUiState {
  return {
    id: "summarize-project-state",
    label: "Summarize Project State",
    instruction: "Produce a concise summary.",
    ...overrides,
  };
}

describe("ai workspace engine", () => {
  test("reuses the current instruction state when it matches the active project id", () => {
    const instructionUiState = createInstructionUiState();

    expect(
      deriveActiveInstructionState("project-1", instructionUiState),
    ).toBe(instructionUiState);
  });

  test("derives an empty fallback instruction state when the project id does not match", () => {
    expect(
      deriveActiveInstructionState(
        "project-2",
        createInstructionUiState(),
      ),
    ).toEqual({
      projectId: "project-2",
      value: "",
      selectedPromptId: null,
    });
  });

  test("derives instruction state from the selected starter prompt", () => {
    expect(
      deriveSelectedStarterPromptInstructionState(
        "project-2",
        createStarterPromptUiState(),
      ),
    ).toEqual({
      projectId: "project-2",
      value: "Produce a concise summary.",
      selectedPromptId: "summarize-project-state",
    });
  });

  test("derives instruction state from manual instruction input", () => {
    expect(
      deriveManualInstructionChangeState(
        "project-2",
        "Write a custom instruction.",
      ),
    ).toEqual({
      projectId: "project-2",
      value: "Write a custom instruction.",
      selectedPromptId: null,
    });
  });

  test("reports zero local context when no exchanges exist", () => {
    expect(getConversationContextExchangeCount([])).toBe(0);
    expect(getConversationContextStatusMessage([])).toBe(
      "Next Generate will use no local conversation context.",
    );
  });

  test("reports singular local context status for one exchange", () => {
    const exchanges = [createExchange(1, "Instruction 1", "Response 1")];

    expect(getConversationContextExchangeCount(exchanges)).toBe(1);
    expect(getConversationContextStatusMessage(exchanges)).toBe(
      "Next Generate will use the last 1 local exchange.",
    );
  });

  test("caps local context count at the latest three exchanges", () => {
    const exchanges = [
      createExchange(1, "Instruction 1", "Response 1"),
      createExchange(2, "Instruction 2", "Response 2"),
      createExchange(3, "Instruction 3", "Response 3"),
      createExchange(4, "Instruction 4", "Response 4"),
    ];

    expect(getConversationContextExchangeCount(exchanges)).toBe(3);
    expect(getConversationContextStatusMessage(exchanges)).toBe(
      "Next Generate will use the last 3 local exchanges.",
    );
  });

  test("returns the raw instruction when no exchanges exist", () => {
    expect(buildGenerationInstruction("Summarize project", [])).toBe(
      "Summarize project",
    );
  });

  test("builds a bounded generation instruction from the latest three exchanges", () => {
    const instruction = buildGenerationInstruction("Instruction 5", [
      createExchange(1, "Instruction 1", "Response 1"),
      createExchange(2, "Instruction 2", "Response 2"),
      createExchange(3, "Instruction 3", "Response 3"),
      createExchange(4, "Instruction 4", "Response 4"),
    ]);

    expect(instruction).toContain(
      "Use the following local conversation context from the current AI Workspace session.",
    );
    expect(instruction).toContain("Exchange 1 - User Instruction:\nInstruction 2");
    expect(instruction).toContain("Exchange 1 - AI Response:\nResponse 2");
    expect(instruction).toContain("Exchange 2 - User Instruction:\nInstruction 3");
    expect(instruction).toContain("Exchange 2 - AI Response:\nResponse 3");
    expect(instruction).toContain("Exchange 3 - User Instruction:\nInstruction 4");
    expect(instruction).toContain("Exchange 3 - AI Response:\nResponse 4");
    expect(instruction).toContain("Current User Instruction:\nInstruction 5");
    expect(instruction).not.toContain("Instruction 1");
    expect(instruction).not.toContain("Response 1");
  });

  test("reuses the current generation state when it matches the active project id", () => {
    const generationUiState = createGenerationUiState();

    expect(
      deriveActiveGenerationState("project-1", generationUiState),
    ).toBe(generationUiState);
  });

  test("derives an idle fallback generation state when the project id does not match", () => {
    expect(
      deriveActiveGenerationState(
        "project-2",
        createGenerationUiState({
          errorMessage: "Existing error",
        }),
      ),
    ).toEqual({
      projectId: "project-2",
      state: "idle",
      exchanges: [],
      latestExchangeId: null,
      errorMessage: null,
    });
  });

  test("derives the reset generation state with the existing idle defaults", () => {
    expect(deriveResetGenerationState("project-2")).toEqual({
      projectId: "project-2",
      state: "idle",
      exchanges: [],
      latestExchangeId: null,
      errorMessage: null,
    });
  });

  test("derives the generating state while preserving local exchanges for the active project", () => {
    expect(
      deriveGenerationStartState(
        "project-1",
        createGenerationUiState({
          state: "error",
          errorMessage: "Existing error",
        }),
      ),
    ).toEqual({
      projectId: "project-1",
      state: "generating",
      exchanges: [createExchange(1, "Instruction 1", "Response 1")],
      latestExchangeId: 1,
      errorMessage: null,
    });
  });

  test("derives the generating state with empty local context for a different project", () => {
    expect(
      deriveGenerationStartState(
        "project-2",
        createGenerationUiState({
          errorMessage: "Existing error",
        }),
      ),
    ).toEqual({
      projectId: "project-2",
      state: "generating",
      exchanges: [],
      latestExchangeId: null,
      errorMessage: null,
    });
  });

  test("derives the error state while preserving local exchanges for the active project", () => {
    expect(
      deriveGenerationErrorState(
        "project-1",
        createGenerationUiState(),
        "Generation failed.",
      ),
    ).toEqual({
      projectId: "project-1",
      state: "error",
      exchanges: [createExchange(1, "Instruction 1", "Response 1")],
      latestExchangeId: 1,
      errorMessage: "Generation failed.",
    });
  });

  test("derives the error state with empty local context for a different project", () => {
    expect(
      deriveGenerationErrorState(
        "project-2",
        createGenerationUiState(),
        "Generation failed.",
      ),
    ).toEqual({
      projectId: "project-2",
      state: "error",
      exchanges: [],
      latestExchangeId: null,
      errorMessage: "Generation failed.",
    });
  });

  test("derives the generated state while preserving local exchanges for the active project", () => {
    const newExchange = createExchange(2, "Instruction 2", "Response 2");

    expect(
      deriveGenerationSuccessState(
        "project-1",
        createGenerationUiState({
          state: "error",
          errorMessage: "Existing error",
        }),
        newExchange,
        2,
      ),
    ).toEqual({
      projectId: "project-1",
      state: "generated",
      exchanges: [
        createExchange(1, "Instruction 1", "Response 1"),
        newExchange,
      ],
      latestExchangeId: 2,
      errorMessage: null,
    });
  });

  test("derives the generated state with only the new exchange for a different project", () => {
    const newExchange = createExchange(2, "Instruction 2", "Response 2");

    expect(
      deriveGenerationSuccessState(
        "project-2",
        createGenerationUiState({
          errorMessage: "Existing error",
        }),
        newExchange,
        2,
      ),
    ).toEqual({
      projectId: "project-2",
      state: "generated",
      exchanges: [newExchange],
      latestExchangeId: 2,
      errorMessage: null,
    });
  });

  test("derives the default generate action presentation outside active generation", () => {
    expect(deriveGenerateActionPresentation("idle")).toEqual({
      label: "Generate",
      disabled: false,
    });
    expect(deriveGenerateActionPresentation("generated")).toEqual({
      label: "Generate",
      disabled: false,
    });
    expect(deriveGenerateActionPresentation("error")).toEqual({
      label: "Generate",
      disabled: false,
    });
  });

  test("derives a disabled generate action presentation during active generation", () => {
    expect(deriveGenerateActionPresentation("generating")).toEqual({
      label: "Generating...",
      disabled: true,
    });
  });

  test("derives a hidden reset action presentation when no exchanges exist", () => {
    expect(deriveResetActionPresentation("idle", [])).toEqual({
      label: "Reset Conversation",
      disabled: false,
      visible: false,
    });
  });

  test("derives reset action presentation visibility and disabled state from generation activity", () => {
    const exchanges = [createExchange(1, "Instruction 1", "Response 1")];

    expect(deriveResetActionPresentation("generated", exchanges)).toEqual({
      label: "Reset Conversation",
      disabled: false,
      visible: true,
    });
    expect(deriveResetActionPresentation("generating", exchanges)).toEqual({
      label: "Reset Conversation",
      disabled: true,
      visible: true,
    });
  });

  test("derives no latest exchange when the latest exchange id is null", () => {
    expect(
      deriveLatestExchange(null, [createExchange(1, "Instruction 1", "Response 1")]),
    ).toBeNull();
  });

  test("derives the matching latest exchange when the id exists", () => {
    const exchange = createExchange(2, "Instruction 2", "Response 2");

    expect(
      deriveLatestExchange(2, [
        createExchange(1, "Instruction 1", "Response 1"),
        exchange,
      ]),
    ).toBe(exchange);
  });

  test("derives no latest exchange when the id does not exist", () => {
    expect(
      deriveLatestExchange(3, [
        createExchange(1, "Instruction 1", "Response 1"),
        createExchange(2, "Instruction 2", "Response 2"),
      ]),
    ).toBeNull();
  });

  test("reuses stored save UI state only when it still matches the latest exchange", () => {
    const saveUiState = createSaveUiState({
      state: "saved",
      refreshErrorMessage: "Saved to Knowledge, but AI project context could not be refreshed.",
    });

    expect(
      deriveActiveSaveState(
        "project-1",
        createExchange(1, "Instruction 1", "Response 1"),
        saveUiState,
      ),
    ).toBe(saveUiState);
  });

  test("derives a fresh ready-to-save state when the stored save source no longer matches", () => {
    expect(
      deriveActiveSaveState(
        "project-1",
        createExchange(2, "Instruction 2", "Response 2"),
        createSaveUiState(),
      ),
    ).toEqual({
      projectId: "project-1",
      sourceExchangeId: 2,
      sourceContent: "Response 2",
      state: "ready-to-save",
      title: "",
      errorMessage: null,
      refreshErrorMessage: null,
    });
  });

  test("derives an idle state when there is no latest exchange response to save", () => {
    expect(
      deriveActiveSaveState(
        "project-1",
        null,
        createSaveUiState({
          sourceExchangeId: null,
          sourceContent: null,
        }),
      ),
    ).toEqual({
      projectId: "project-1",
      sourceExchangeId: null,
      sourceContent: null,
      state: "idle",
      title: "",
      errorMessage: null,
      refreshErrorMessage: null,
    });
  });

  test("derives the reset save state with the existing idle defaults", () => {
    expect(deriveResetSaveState("project-2")).toEqual({
      projectId: "project-2",
      sourceExchangeId: null,
      sourceContent: null,
      state: "idle",
      title: "",
      errorMessage: null,
      refreshErrorMessage: null,
    });
  });

  test("derives the saving save state with the existing inline field values", () => {
    expect(
      deriveSaveSavingState(
        "project-1",
        createExchange(2, "Instruction 2", "Response 2"),
        "Architecture note",
      ),
    ).toEqual({
      projectId: "project-1",
      sourceExchangeId: 2,
      sourceContent: "Response 2",
      state: "saving",
      title: "Architecture note",
      errorMessage: null,
      refreshErrorMessage: null,
    });
  });

  test("derives the saved save state with the existing inline field values", () => {
    expect(
      deriveSaveSuccessState(
        "project-1",
        createExchange(2, "Instruction 2", "Response 2"),
        "Architecture note",
      ),
    ).toEqual({
      projectId: "project-1",
      sourceExchangeId: 2,
      sourceContent: "Response 2",
      state: "saved",
      title: "Architecture note",
      errorMessage: null,
      refreshErrorMessage: null,
    });
  });

  test("derives the saved refresh-warning state with the existing inline field values", () => {
    expect(
      deriveSaveRefreshWarningState(
        "project-1",
        createExchange(2, "Instruction 2", "Response 2"),
        "Architecture note",
      ),
    ).toEqual({
      projectId: "project-1",
      sourceExchangeId: 2,
      sourceContent: "Response 2",
      state: "saved",
      title: "Architecture note",
      errorMessage: null,
      refreshErrorMessage:
        "Saved to Knowledge, but AI project context could not be refreshed.",
    });
  });

  test("derives the save-error state with the existing inline field values", () => {
    expect(
      deriveSaveErrorState(
        "project-1",
        createExchange(2, "Instruction 2", "Response 2"),
        "Architecture note",
        "Project not found.",
      ),
    ).toEqual({
      projectId: "project-1",
      sourceExchangeId: 2,
      sourceContent: "Response 2",
      state: "save-error",
      title: "Architecture note",
      errorMessage: "Project not found.",
      refreshErrorMessage: null,
    });
  });

  test("derives the default save action presentation for editable save states", () => {
    expect(deriveSaveActionPresentation("idle")).toEqual({
      label: "Save to Knowledge",
      disabled: false,
    });
    expect(deriveSaveActionPresentation("ready-to-save")).toEqual({
      label: "Save to Knowledge",
      disabled: false,
    });
    expect(deriveSaveActionPresentation("save-error")).toEqual({
      label: "Save to Knowledge",
      disabled: false,
    });
  });

  test("derives disabled save action presentations for saving and saved states", () => {
    expect(deriveSaveActionPresentation("saving")).toEqual({
      label: "Saving...",
      disabled: true,
    });
    expect(deriveSaveActionPresentation("saved")).toEqual({
      label: "Saved",
      disabled: true,
    });
  });

  test("maps generation statuses to the existing UI error messages", () => {
    expect(getGenerationErrorMessage("invalid-request")).toBe(
      "Enter a valid instruction.",
    );
    expect(getGenerationErrorMessage("invalid-instruction")).toBe(
      "Enter a valid instruction.",
    );
    expect(getGenerationErrorMessage("project-not-found")).toBe(
      "Project not found.",
    );
    expect(getGenerationErrorMessage("context-unavailable")).toBe(
      "AI project context unavailable.",
    );
    expect(getGenerationErrorMessage("provider-unavailable")).toBe(
      "AI provider unavailable.",
    );
    expect(getGenerationErrorMessage("generation-failed")).toBe(
      "Generation failed.",
    );
    expect(getGenerationErrorMessage("internal-error")).toBe(
      "Generation failed.",
    );
    expect(getGenerationErrorMessage("unexpected-status")).toBe(
      "Unexpected generation error.",
    );
  });

  test("maps save statuses to the existing UI error messages", () => {
    expect(getSaveErrorMessage("invalid-request")).toBe(
      "Enter a valid title.",
    );
    expect(getSaveErrorMessage("project-not-found")).toBe(
      "Project not found.",
    );
    expect(getSaveErrorMessage("context-unavailable")).toBe(
      "Knowledge save unavailable.",
    );
    expect(getSaveErrorMessage("unexpected-status")).toBe(
      "Unexpected save error.",
    );
  });
});
