import Link from "next/link";
import type {
  ProjectConsumerKnowledgeEntry,
  ProjectConsumerTask,
} from "@/lib/project-brain/types";

type WorkspaceCollectionsProps = {
  projectId: string;
  tasks: ProjectConsumerTask[];
  knowledgeEntries: ProjectConsumerKnowledgeEntry[];
};

export function WorkspaceCollections({
  projectId,
  tasks,
  knowledgeEntries,
}: WorkspaceCollectionsProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Zadania</p>
        {tasks.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">Brak zadań.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100"
              >
                {task.title}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/projects/${projectId}/tasks`}
          className="mt-4 inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
        >
          Zobacz wszystkie zadania
        </Link>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Wiedza
        </p>
        {knowledgeEntries.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">
            Brak wpisów wiedzy.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {knowledgeEntries.map((knowledgeEntry) => (
              <li
                key={knowledgeEntry.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100"
              >
                {knowledgeEntry.title}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/projects/${projectId}/knowledge`}
          className="mt-4 inline-flex rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
        >
          Zobacz całą wiedzę
        </Link>
      </div>
    </div>
  );
}
