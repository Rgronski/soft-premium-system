"use client";

import {
  createTaskOnServer,
  getTasksFromServer,
  TaskServerError,
} from "@/lib/task/browser-server";
import type { Task } from "@/lib/task/types";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function getTaskErrorMessage(error: unknown): string {
  if (error instanceof TaskServerError) {
    switch (error.code) {
      case "invalid-request":
        return "Nie udało się dodać zadania. Sprawdź dane.";
      case "project-not-found":
        return "Projekt nie istnieje.";
      case "context-unavailable":
        return "Dane projektu są chwilowo niedostępne.";
      case "network-error":
        return "Nie udało się połączyć z serwerem.";
      case "invalid-response":
        return "Serwer zwrócił nieprawidłową odpowiedź.";
    }
  }

  return "Nie udało się wykonać operacji na zadaniach.";
}

export default function ProjectTasksPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mountedRef = useRef(true);
  const projectIdRef = useRef(projectId);

  projectIdRef.current = projectId;

  useEffect(() => {
    setIsSubmitting(false);
  }, [projectId]);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const loadedTasks = await getTasksFromServer(projectId);

        if (ignore) {
          return;
        }

        setTasks(loadedTasks);
      } catch (error) {
        if (ignore) {
          return;
        }

        setErrorMessage(getTaskErrorMessage(error));
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    void loadTasks();

    return () => {
      ignore = true;
    };
  }, [projectId]);

  async function handleAddTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = taskTitle.trim();

    if (!title) {
      setErrorMessage("Nie udało się dodać zadania. Sprawdź dane.");
      return;
    }

    if (isSubmitting) {
      return;
    }

    const submittedProjectId = projectId;

    function isCurrentSubmission() {
      return (
        mountedRef.current &&
        projectIdRef.current === submittedProjectId
      );
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await createTaskOnServer({
        projectId: submittedProjectId,
        title,
      });

      if (!isCurrentSubmission()) {
        return;
      }

      const refreshedTasks = await getTasksFromServer(submittedProjectId);

      if (!isCurrentSubmission()) {
        return;
      }

      setTasks(refreshedTasks);
      setTaskTitle("");
    } catch (error) {
      if (!isCurrentSubmission()) {
        return;
      }

      setErrorMessage(getTaskErrorMessage(error));
    } finally {
      if (isCurrentSubmission()) {
        setIsSubmitting(false);
      }
    }
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
          <form
            onSubmit={(event) => {
              void handleAddTask(event);
            }}
            className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]"
          >
            <input
              type="text"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              placeholder="Task title"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-zinc-500"
            />

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Zapisywanie..." : "Add"}
            </button>
          </form>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          {isLoading ? (
            <p className="text-sm text-zinc-400">Loading tasks...</p>
          ) : errorMessage ? (
            <p className="text-sm text-zinc-400">{errorMessage}</p>
          ) : tasks.length === 0 ? (
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
