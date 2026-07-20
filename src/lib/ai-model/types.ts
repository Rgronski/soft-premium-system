export type GenerateAiProjectResponseInput = {
  projectId: string;
  instruction: string;
};

export type GenerateAiProjectResponseResult =
  | {
      status: "generated";
      content: string;
    }
  | {
      status: "project-not-found";
    }
  | {
      status: "context-unavailable";
    }
  | {
      status: "invalid-instruction";
    }
  | {
      status: "provider-unavailable";
    }
  | {
      status: "generation-failed";
    };
