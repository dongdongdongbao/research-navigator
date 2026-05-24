"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

interface TagFilterProps {
  available: string[];
  counts: Map<string, number>;
  selected: string[];
  onToggle: (tag: string) => void;
}

const INITIAL_VISIBLE = 8;

export function TagFilter({
  available,
  counts,
  selected,
  onToggle,
}: TagFilterProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? available : available.slice(0, INITIAL_VISIBLE);
  const remaining = available.length - INITIAL_VISIBLE;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted shrink-0 mr-1">
        tags
      </span>
      {visible.map((t) => {
        const isOn = selected.includes(t);
        const c = counts.get(t) ?? 0;
        return (
          <button
            key={t}
            type="button"
            aria-pressed={isOn}
            onClick={() => onToggle(t)}
            className={cn(
              "h-7 px-2.5 rounded-full text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[color:var(--background)]",
              isOn
                ? "bg-[color:var(--accent-soft)] text-[color:var(--violet)] border border-[color:var(--violet)]/40 shadow-[0_0_12px_rgba(139,92,246,0.25)]"
                : "glass text-foreground hover:border-[color:var(--violet)]/30",
            )}
          >
            {t}
            <span
              className={cn(
                "ml-1 font-mono",
                isOn ? "text-[color:var(--cyan)]" : "opacity-60",
              )}
            >
              {c}
            </span>
          </button>
        );
      })}
      {remaining > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1 h-7 px-2.5 rounded-full text-xs border border-dashed border-border-strong text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
        >
          {expanded ? "收起" : `更多 ${remaining}`}
          <Icon
            name="chevron-down"
            size={12}
            className={cn("transition-transform", expanded && "rotate-180")}
          />
        </button>
      )}
    </div>
  );
}
