import { ReactNode } from "react";

interface ProposalPageShellProps {
  children: ReactNode;
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/** Shared white layout for landing + card grid (proposal UI). */
export function ProposalPageShell({
  children,
  label = "Factorial HR",
  title,
  subtitle,
  className = "",
}: ProposalPageShellProps) {
  return (
    <div className={`proposal-font min-h-screen bg-background text-foreground font-sans ${className}`}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-10 md:pt-14 pb-12">
        <p className="text-primary text-sm tracking-[0.35em] uppercase font-bold mb-4">{label}</p>
        <h1 className="text-3xl md:text-5xl font-semibold text-foreground leading-tight max-w-3xl">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-base md:text-lg mt-3 max-w-2xl">{subtitle}</p>}
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </div>
  );
}
