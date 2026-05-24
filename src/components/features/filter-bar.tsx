"use client";

import { Icon } from "@/components/ui/icon";
import { CategoryPills } from "@/components/features/category-pills";
import { TagFilter } from "@/components/features/tag-filter";
import type { CategorySlug } from "@/lib/types";

interface FilterBarProps {
  q: string;
  cat: CategorySlug | null;
  tags: string[];
  availableTags: string[];
  tagCounts: Map<string, number>;
  onQueryChange: (q: string) => void;
  onCatChange: (cat: CategorySlug | null) => void;
  onTagToggle: (tag: string) => void;
}

export function FilterBar({
  q,
  cat,
  tags,
  availableTags,
  tagCounts,
  onQueryChange,
  onCatChange,
  onTagToggle,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative group">
        <span className="absolute inset-y-0 left-3.5 flex items-center text-muted group-focus-within:text-[color:var(--violet)] transition-colors">
          <Icon name="search" size={16} aria-hidden />
        </span>
        <label className="sr-only" htmlFor="filter-search">
          搜索资源
        </label>
        <input
          id="filter-search"
          type="search"
          value={q}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="按名称、描述或标签搜索…"
          className="glass w-full h-11 pl-10 pr-3 rounded-xl text-foreground placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[color:var(--background)]"
        />
      </div>
      <CategoryPills selected={cat} onSelect={onCatChange} />
      <TagFilter
        available={availableTags}
        counts={tagCounts}
        selected={tags}
        onToggle={onTagToggle}
      />
    </div>
  );
}
