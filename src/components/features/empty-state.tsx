"use client";

import { Icon } from "@/components/ui/icon";

interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="glass rounded-2xl p-12 text-center">
      <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-[color:var(--violet)]">
        <Icon name="search" size={20} aria-hidden />
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold">
        没有匹配的资源
      </h3>
      <p className="mt-1 text-sm text-muted">
        试着换个关键词，或者清除当前筛选条件。
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 inline-flex items-center h-10 px-5 rounded-xl bg-aurora text-white text-sm font-medium hover:shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
      >
        清除全部筛选
      </button>
    </div>
  );
}
