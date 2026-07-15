import type {
  ProjectConsumerKnowledgeEntry,
  ProjectConsumerTask,
} from "@/lib/project-brain/types";

type WorkspaceCollectionsProps = {
  tasks: ProjectConsumerTask[];
  knowledgeEntries: ProjectConsumerKnowledgeEntry[];
};

export function WorkspaceCollections({
  tasks,
  knowledgeEntries,
}: WorkspaceCollectionsProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Tasks</p>
        {tasks.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">No tasks available.</p>
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
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
          Knowledge Entries
        </p>
        {knowledgeEntries.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">
            No knowledge entries available.
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
      </div>
    </div>
  );
}
