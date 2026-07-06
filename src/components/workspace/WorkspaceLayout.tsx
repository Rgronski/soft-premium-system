import { SectionCard } from "@/components/ui/SectionCard";
import type { ReactNode } from "react";

type WorkspaceLayoutProps = {
  children: ReactNode;
};

export function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return <SectionCard>{children}</SectionCard>;
}
