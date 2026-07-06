import type { ReactNode } from "react";

type WorkspaceContentProps = {
  children: ReactNode;
};

export function WorkspaceContent({ children }: WorkspaceContentProps) {
  return <div className="space-y-6">{children}</div>;
}
