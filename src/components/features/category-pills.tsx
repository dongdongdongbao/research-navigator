"use client";

import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";
import type { CategorySlug } from "@/lib/types";

interface CategoryPillsProps {
  selected: CategorySlug | null;
  onSelect: (cat: CategorySlug | null) => void;
}

export function CategoryPills({ selected, onSelect }: CategoryPillsProps) {
  const allActive = selected === null;
  return (
    <div
      role="tablist"
      aria-label="按分类筛选"
      className="-mx-4 sm:mx-0 overflow-x-auto"
    >
      <div className="flex w-max gap-2 px-4 sm:px-0 py-1">
        <PillButton active={allActive} onClick={() => onSelect(null)}>
          全部
        </PillButton>
        {categories.map((c) => {
          const active = selected === c.slug;
          return (
            <PillButton
              key={c.slug}
              active={active}
              onClick={() => onSelect(active ? null : c.slug)}
            >
              {c.name}
              <span className="ml-1.5 text-[10px] font-mono opacity-70">
                {c.nameEn.toLowerCase().replace(/\s+/g, "-")}
              </span>
            </PillButton>
          );
        })}
      </div>
    </div>
  );
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "relative h-9 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
        active
          ? "bg-aurora text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
          : "glass text-foreground hover:border-[color:var(--violet)]/40",
      )}
    >
      {children}
    </button>
  );
}
