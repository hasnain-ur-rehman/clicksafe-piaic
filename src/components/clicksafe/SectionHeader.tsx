import type { ReactNode } from "react";

export function SectionHeader({ eyebrow, title, children, id }: { eyebrow: string; title: string; children?: ReactNode; id: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-2xl font-semibold sm:text-3xl outline-none">{title}</h2>
      {children && <p className="mt-3 text-muted-foreground">{children}</p>}
    </div>
  );
}
