import type { KnowledgeEntry } from "./types";

function getKnowledgeStorageKey(projectId: string) {
  return `soft-premium-system.projects.${projectId}.knowledge`;
}

export function getKnowledge(projectId: string): KnowledgeEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedKnowledge = localStorage.getItem(getKnowledgeStorageKey(projectId));
  return savedKnowledge ? JSON.parse(savedKnowledge) : [];
}

export function getKnowledgeEntry(
  projectId: string,
  knowledgeId: string,
): KnowledgeEntry | null {
  const knowledge = getKnowledge(projectId);

  return knowledge.find((entry) => entry.id === knowledgeId) ?? null;
}

export function createKnowledgeEntry(
  projectId: string,
  title: string,
  content: string,
): KnowledgeEntry | null {
  if (typeof window === "undefined") {
    return null;
  }

  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();

  if (!trimmedTitle || !trimmedContent) {
    return null;
  }

  const newKnowledgeEntry: KnowledgeEntry = {
    id: crypto.randomUUID(),
    projectId,
    title: trimmedTitle,
    content: trimmedContent,
    createdAt: new Date().toISOString(),
  };

  const knowledge = getKnowledge(projectId);
  const updatedKnowledge = [...knowledge, newKnowledgeEntry];

  localStorage.setItem(
    getKnowledgeStorageKey(projectId),
    JSON.stringify(updatedKnowledge),
  );

  return newKnowledgeEntry;
}
