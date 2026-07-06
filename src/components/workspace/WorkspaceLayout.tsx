import type { ReactNode } from "react";

type WorkspaceLayoutProps = {
  children: ReactNode;
};

export function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      {children}
    </section>
  );
}
