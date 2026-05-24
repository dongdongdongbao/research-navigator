import { cn } from "@/lib/cn";

type Tone = "default" | "accent" | "outline" | "soft" | "mono";

interface BadgeProps {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}

const toneStyles: Record<Tone, string> = {
  default: "glass text-foreground",
  accent: "bg-aurora text-white border-0",
  outline: "bg-transparent text-foreground border border-border-strong",
  soft:
    "bg-[color:var(--accent-soft)] text-[color:var(--violet)] border border-transparent",
  mono:
    "bg-transparent text-muted border-0 font-mono uppercase tracking-widest text-[10px]",
};

export function Badge({ tone = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
