"use client";

import { Icon } from "@/components/ui/icon";
import { categories } from "@/data/categories";
import { OrbField } from "@/components/features/orb-field";
import { NodeNetwork } from "@/components/features/node-network";

interface HeroProps {
  q: string;
  onQueryChange: (q: string) => void;
  onJumpToList: () => void;
  totalCount: number;
}

export function Hero({
  q,
  onQueryChange,
  onJumpToList,
  totalCount,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background layers */}
      <OrbField />
      <div
        aria-hidden
        className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--violet)]/60 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Left: title + search */}
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 self-start rounded-full glass px-3 py-1 text-xs font-mono text-muted">
              <span className="size-1.5 rounded-full bg-aurora" aria-hidden />
              <span>vol.001 · curated · {totalCount} entries</span>
            </div>

            <h1
              className="font-display font-semibold tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 6.5vw, 4.75rem)",
                lineHeight: 0.98,
              }}
            >
              科研工具
              <br />
              <span className="text-muted">不该靠</span>
              <span className="text-aurora">记忆</span>
              <span className="text-muted">。</span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-muted max-w-xl">
              Research Navigator — 一个为研究者整理的导航站。
              论文搜索、预印本、代码复现、开放数据、文献图谱、数据集、写作工具，
              全部链接到原站，描述为原创整理，零账号、零追踪。
            </p>

            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                onJumpToList();
              }}
              className="flex flex-col gap-3 sm:flex-row max-w-xl"
            >
              <label className="sr-only" htmlFor="hero-search">
                搜索资源
              </label>
              <div className="relative flex-1 group">
                <span className="absolute inset-y-0 left-3.5 flex items-center text-muted group-focus-within:text-[color:var(--violet)] transition-colors">
                  <Icon name="search" size={18} aria-hidden />
                </span>
                <input
                  id="hero-search"
                  type="search"
                  value={q}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="搜 arXiv、LaTeX、Open Data…"
                  className="glass w-full h-12 pl-11 pr-4 rounded-xl text-foreground placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
                />
              </div>
              <button
                type="submit"
                className="relative h-12 px-6 rounded-xl bg-aurora text-white font-medium overflow-hidden transition-transform hover:-translate-y-px hover:shadow-[0_0_28px_rgba(139,92,246,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
              >
                浏览资源 →
              </button>
            </form>
          </div>

          {/* Right: node network */}
          <div
            aria-hidden
            className="hidden lg:block relative w-[360px] h-[280px]"
          >
            <div className="absolute inset-0 rounded-3xl bg-aurora opacity-[0.08] blur-3xl" />
            <NodeNetwork className="relative w-full h-full" />
          </div>
        </div>

        {/* Category band */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-mono text-xs uppercase tracking-widest text-muted mr-2">
            sections
          </span>
          {categories.map((c) => (
            <span
              key={c.slug}
              className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs"
            >
              <span
                className="size-1.5 rounded-full bg-[color:var(--violet)]"
                aria-hidden
              />
              <span>{c.name}</span>
              <span className="font-mono text-muted/80">
                {c.nameEn.toLowerCase()}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
