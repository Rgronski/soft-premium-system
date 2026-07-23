CREATE TABLE IF NOT EXISTS public.tasks (
    id uuid PRIMARY KEY,
    project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE RESTRICT,
    title text NOT NULL,
    created_at timestamptz NOT NULL,
    CONSTRAINT tasks_title_not_blank
        CHECK (btrim(title) <> '')
);

CREATE INDEX IF NOT EXISTS idx_tasks_project_id_created_at_id
    ON public.tasks (project_id, created_at, id);

CREATE TABLE IF NOT EXISTS public.knowledge_entries (
    id uuid PRIMARY KEY,
    project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE RESTRICT,
    title text NOT NULL,
    content text NOT NULL,
    created_at timestamptz NOT NULL,
    CONSTRAINT knowledge_entries_title_not_blank
        CHECK (btrim(title) <> ''),
    CONSTRAINT knowledge_entries_content_not_blank
        CHECK (btrim(content) <> '')
);

CREATE INDEX IF NOT EXISTS idx_knowledge_entries_project_id_created_at_id
    ON public.knowledge_entries (project_id, created_at, id);
