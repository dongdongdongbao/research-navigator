import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-[color:var(--background)]/70 backdrop-blur-xl supports-[backdrop-filter]:bg-[color:var(--background)]/50">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-sm tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] rounded"
        >
          <span
            aria-hidden
            className="relative inline-block size-2.5 rounded-full bg-aurora shadow-[0_0_10px_rgba(139,92,246,0.7)]"
          />
          <span>
            <span className="text-aurora font-semibold">research</span>
            <span className="text-muted">/</span>
            <span>navigator</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <a
            href="#resources"
            className="hidden sm:inline-flex h-9 items-center px-3 text-sm text-muted hover:text-foreground transition-colors"
          >
            资源
          </a>
          <a
            href="#stats"
            className="hidden sm:inline-flex h-9 items-center px-3 text-sm text-muted hover:text-foreground transition-colors"
          >
            统计
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
