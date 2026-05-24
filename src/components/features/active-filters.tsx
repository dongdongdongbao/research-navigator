"use client";

import { categoryBySlug } from "@/data/categories";
import { Icon } from "@/components/ui/icon";
import type { CategorySlug } from "@/lib/types";

interface ActiveFiltersProps {
  q: string;
  cat: CategorySlug | null;
  tags: string[];
  matchCount: number;
  totalCount: number;
  onClearQ: () => void;
  onClearCat: () => void;
  onRemoveTag: (tag: string) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  q,
  cat,
  tags,
  matchCount,
  totalCount,
  onClearQ,
  onClearCat,
  onRemoveTag,
  onClearAll,
}: ActiveFiltersProps) {
  const hasAny = Boolean(q) || cat !== null || tags.length > 0;
  const catLabel = cat ? categoryBySlug.get(cat)?.name : null;

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="font-mono text-[11px] text-muted tabular-nums">
        <span className="text-foreground">{matchCount}</span>
        <span className="text-muted/60"> / {totalCount} 条结果</span>
      </span>
      {q && <Chip onRemove={onClearQ} label={`搜索：${q}`} />}
      {catLabel && <Chip onRemove={onClearCat} label={`分类：${catLabel}`} />}
      {tags.map((t) => (
        <Chip key={t} onRemove={() => onRemoveTag(t)} label={`#${t}`} />
      ))}
      {hasAny && (
        <button
          type="button"
          onClick={onClearAll}
          className="ml-auto text-xs text-muted hover:text-[color:var(--violet)] underline underline-offset-4 decoration-dotted"
        >
          清除全部筛选
        </button>
      )}
    </div>
  );
}

function Chip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 h-7 pl-2.5 pr-1 rounded-full glass text-xs">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`移除 ${label}`}
        className="inline-flex items-center justify-center size-5 rounded-full text-muted hover:text-[color:var(--violet)] hover:bg-[color:var(--accent-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
      >
        <Icon name="x" size={11} aria-hidden />
      </button>
    </span>
  );
}
