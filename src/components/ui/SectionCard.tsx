import type { ReactNode } from "react";

type SectionCardProps = {
  children: ReactNode;
  className?: string;
};

export function SectionCard({ children, className }: SectionCardProps) {
  return (
    <section
      className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-6${className ? ` ${className}` : ""}`}
    >
      {children}
    </section>
  );
}
