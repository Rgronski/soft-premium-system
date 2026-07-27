import {
  buildGenerationInstruction,
  getConversationContextExchangeCount,
  getConversationContextStatusMessage,
  type ConversationExchange,
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

describe("ai workspace engine", () => {
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
});
