CREATE TABLE projects (
    id uuid PRIMARY KEY,
    name text NOT NULL,
    created_at timestamptz NOT NULL,
    CONSTRAINT projects_name_not_blank
        CHECK (btrim(name) <> '')
);
