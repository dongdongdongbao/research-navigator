"use client";

import { useCallback, useDeferredValue, useMemo, useRef } from "react";
import { resources } from "@/data/resources";
import { countByTag } from "@/data/tags";
import { applyFilters } from "@/lib/filter";
import { validateResources } from "@/lib/validate-data";
import { useUrlState } from "@/hooks/use-url-state";
import { Hero } from "@/components/features/hero";
import { FilterBar } from "@/components/features/filter-bar";
import { ActiveFilters } from "@/components/features/active-filters";
import { ResourceGrid } from "@/components/features/resource-grid";
import { EmptyState } from "@/components/features/empty-state";
import { StatsBar } from "@/components/features/stats-bar";
import { ResourceDrawer } from "@/components/features/resource-drawer";
import type { CategorySlug } from "@/lib/types";

if (process.env.NODE_ENV !== "production") {
  validateResources(resources);
}

function withViewTransition(cb: () => void) {
  if (typeof document === "undefined") {
    cb();
    return;
  }
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || typeof document.startViewTransition !== "function") {
    cb();
    return;
  }
  document.startViewTransition(cb);
}

export function NavigatorShell() {
  const [state, patch] = useUrlState();
  const deferredQ = useDeferredValue(state.q);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      applyFilters({
        resources,
        category: state.cat,
        tags: state.tags,
        query: deferredQ,
      }),
    [state.cat, state.tags, deferredQ],
  );

  const availableTags = useMemo(() => {
    const counts = countByTag(resources);
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t);
  }, []);

  const tagCounts = useMemo(() => countByTag(resources), []);

  const activeResource = useMemo(
    () =>
      state.id ? (resources.find((r) => r.id === state.id) ?? null) : null,
    [state.id],
  );

  const scrollToList = () => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const patchWithTransition = useCallback(
    (p: Parameters<typeof patch>[0]) => {
      withViewTransition(() => patch(p));
    },
    [patch],
  );

  const toggleTag = useCallback(
    (tag: string) => {
      const has = state.tags.includes(tag);
      patchWithTransition({
        tags: has
          ? state.tags.filter((t) => t !== tag)
          : [...state.tags, tag],
      });
    },
    [state.tags, patchWithTransition],
  );

  const setCategory = useCallback(
    (cat: CategorySlug | null) => patchWithTransition({ cat }),
    [patchWithTransition],
  );

  return (
    <>
      <Hero
        q={state.q}
        onQueryChange={(q) => patch({ q })}
        onJumpToList={scrollToList}
        totalCount={resources.length}
      />

      <div
        id="resources"
        ref={listRef}
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 flex flex-col gap-8 scroll-mt-16"
      >
        <StatsBar
          resources={resources}
          selected={state.cat}
          onSelect={setCategory}
        />

        <section
          aria-labelledby="resources-title"
          className="flex flex-col gap-5"
        >
          <header className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              section.02
            </span>
            <h2
              id="resources-title"
              className="font-display text-3xl sm:text-4xl font-semibold tracking-tight"
            >
              资源导航
            </h2>
            <p className="text-sm text-muted">
              选择分类、组合标签或直接搜索关键词。所有筛选都会反映在 URL 上。
            </p>
          </header>

          <FilterBar
            q={state.q}
            cat={state.cat}
            tags={state.tags}
            availableTags={availableTags}
            tagCounts={tagCounts}
            onQueryChange={(q) => patch({ q })}
            onCatChange={setCategory}
            onTagToggle={toggleTag}
          />

          <ActiveFilters
            q={state.q}
            cat={state.cat}
            tags={state.tags}
            matchCount={filtered.length}
            totalCount={resources.length}
            onClearQ={() => patch({ q: "" })}
            onClearCat={() => setCategory(null)}
            onRemoveTag={(t) =>
              patchWithTransition({
                tags: state.tags.filter((x) => x !== t),
              })
            }
            onClearAll={() =>
              patchWithTransition({
                q: "",
                cat: null,
                tags: [],
                id: null,
              })
            }
          />

          {filtered.length === 0 ? (
            <EmptyState
              onClear={() =>
                patchWithTransition({
                  q: "",
                  cat: null,
                  tags: [],
                  id: null,
                })
              }
            />
          ) : (
            <ResourceGrid
              list={filtered}
              onOpen={(id) => patch({ id })}
              onTagClick={toggleTag}
            />
          )}
        </section>
      </div>

      <ResourceDrawer
        resource={activeResource}
        onClose={() => patch({ id: null })}
        onTagClick={toggleTag}
      />
    </>
  );
}
