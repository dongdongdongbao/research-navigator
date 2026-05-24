"use client";

import { useMemo } from "react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";
import type { CategorySlug, Resource } from "@/lib/types";

interface StatsBarProps {
  resources: Resource[];
  selected: CategorySlug | null;
  onSelect: (cat: CategorySlug | null) => void;
}

export function StatsBar({ resources, selected, onSelect }: StatsBarProps) {
  const stats = useMemo(() => {
    const counts = new Map<CategorySlug, number>();
    for (const c of categories) counts.set(c.slug, 0);
    for (const r of resources) {
      counts.set(r.category, (counts.get(r.category) ?? 0) + 1);
    }
    const max = Math.max(1, ...Array.from(counts.values()));
    return categories.map((c) => {
      const count = counts.get(c.slug) ?? 0;
      return { ...c, count, pct: (count / max) * 100 };
    });
  }, [resources]);

  const total = resources.length;

  return (
    <section
      id="stats"
      aria-labelledby="stats-title"
      className="glass rounded-2xl p-5 sm:p-6"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="stats-title"
          className="font-mono text-[11px] uppercase tracking-widest text-muted"
        >
          按分类分布
        </h2>
        <span className="font-mono text-xs text-muted tabular-nums">
          共 <span className="text-foreground">{total}</span> 条资源
        </span>
      </header>

      <ul className="mt-5 flex flex-col gap-1.5">
        {stats.map((s) => {
          const active = selected === s.slug;
          return (
            <li key={s.slug}>
              <button
                type="button"
                aria-pressed={active}
                aria-label={`${s.name}：${s.count} 条资源，点击筛选`}
                onClick={() => onSelect(active ? null : s.slug)}
                className={cn(
                  "group w-full grid grid-cols-[9rem_1fr_2.5rem] items-center gap-3 py-2 px-2.5 -mx-2.5 rounded-lg text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
                  active
                    ? "bg-[color:var(--accent-soft)] shadow-[0_0_24px_rgba(139,92,246,0.25)]"
                    : "hover:bg-[color:var(--surface-2)]",
                )}
              >
                <span
                  className={cn(
                    "text-sm font-medium truncate transition-colors",
                    active && "text-[color:var(--violet)]",
                  )}
                >
                  {s.name}
                </span>
                <span
                  className="relative h-2 w-full rounded-full bg-[color:var(--surface-2)] overflow-hidden"
                  role="presentation"
                >
                  <span
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full transition-all duration-300",
                      active
                        ? "bg-aurora shadow-[0_0_12px_rgba(139,92,246,0.55)]"
                        : "bg-[color:var(--violet)]/40 group-hover:bg-[color:var(--violet)]/70",
                    )}
                    style={{ width: `${s.pct}%` }}
                  />
                </span>
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums text-right transition-colors",
                    active ? "text-[color:var(--cyan)]" : "text-muted",
                  )}
                >
                  {s.count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
