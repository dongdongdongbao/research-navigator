"use client";

import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { categoryBySlug } from "@/data/categories";
import { cn } from "@/lib/cn";
import type { Resource } from "@/lib/types";

interface ResourceCardProps {
  resource: Resource;
  onOpen: (id: string) => void;
  onTagClick?: (tag: string) => void;
}

const pricingLabel: Record<Resource["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  "academic-free": "Academic",
};

export function ResourceCard({
  resource,
  onOpen,
  onTagClick,
}: ResourceCardProps) {
  const cat = categoryBySlug.get(resource.category);
  const tagsToShow = resource.tags.slice(0, 3);
  const extra = resource.tags.length - tagsToShow.length;

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-3 glass rounded-2xl p-5 transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:border-[color:var(--violet)]/40",
      )}
      style={{
        viewTransitionName: `resource-${resource.id}`,
      }}
    >
      {/* Featured pulse ring */}
      {resource.featured && (
        <span
          aria-hidden
          className="glow-pulse pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-[color:var(--cyan)]/50"
        />
      )}

      {/* Click overlay (opens drawer) */}
      <button
        type="button"
        onClick={() => onOpen(resource.id)}
        aria-label={`查看 ${resource.name} 详情`}
        className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
      />

      <header className="relative flex items-start justify-between gap-3 pointer-events-none">
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-1.5">
            {cat && (
              <Badge tone="soft">
                <Icon name={cat.iconKey} size={11} aria-hidden />
                {cat.name}
              </Badge>
            )}
            {resource.featured && (
              <Badge tone="mono">
                <span className="text-[color:var(--cyan)]">★</span> featured
              </Badge>
            )}
          </div>
          <h3 className="font-display text-xl font-semibold tracking-tight truncate">
            {resource.name}
          </h3>
          {resource.nameEn && resource.nameEn !== resource.name && (
            <p className="font-mono text-[11px] text-muted/80 truncate -mt-1.5">
              {resource.nameEn}
            </p>
          )}
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label={`在新标签打开 ${resource.name}`}
          className="pointer-events-auto relative z-10 inline-flex items-center justify-center size-9 rounded-lg glass text-muted hover:text-[color:var(--cyan)] hover:border-[color:var(--cyan)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
        >
          <Icon name="external" size={14} aria-hidden />
        </a>
      </header>

      <p className="relative text-sm leading-relaxed text-muted line-clamp-3 pointer-events-none">
        {resource.description}
      </p>

      <footer className="relative mt-auto flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/60">
        {tagsToShow.map((t) => (
          <button
            key={t}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onTagClick?.(t);
            }}
            className="pointer-events-auto relative z-10 inline-flex items-center h-6 px-2 rounded-full text-[11px] glass text-muted hover:text-[color:var(--violet)] hover:border-[color:var(--violet)]/50 transition-colors"
          >
            #{t}
          </button>
        ))}
        {extra > 0 && (
          <span className="text-[11px] text-muted/70">+{extra}</span>
        )}
        <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted">
          {pricingLabel[resource.pricing]}
        </span>
      </footer>
    </article>
  );
}
