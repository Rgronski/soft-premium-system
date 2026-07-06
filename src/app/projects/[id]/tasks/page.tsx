"use client";

import { createTask, getTasks } from "@/lib/task/task";
import type { Task } from "@/lib/task/types";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function ProjectTasksPage() {
  const params = useParams<{ id: string }>();
  const [taskTitle, setTaskTitle] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const tasks = useMemo<Task[]>(() => {
    return getTasks(params.id);
  }, [params.id, refreshKey]);

  function handleAddTask() {
    const createdTask = createTask(params.id, taskTitle);

    if (!createdTask) {
      return;
    }

    setTaskTitle("");
    setRefreshKey((currentValue) => currentValue + 1);
  }

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Project Tasks
          </p>
          <h2 className="text-2xl font-semibold text-zinc-50">Tasks</h2>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
            <input
              type="text"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              placeholder="Task title"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-zinc-500"
            />

            <button
              type="button"
              onClick={handleAddTask}
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
            >
              Add
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          {tasks.length === 0 ? (
            <p className="text-sm text-zinc-400">No tasks yet</p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                >
                  <p className="text-base font-medium text-zinc-100">
                    {task.title}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
