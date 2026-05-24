export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[color:var(--surface-1)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-foreground">
            <span className="text-aurora font-semibold">research</span>
            <span className="text-muted">/</span>navigator
          </span>
          <span className="text-xs leading-relaxed">
            一个为研究生与科研新人整理的工具导航。
            链接均跳转至原站，描述为原创整理。
          </span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono">
          <span>Built with Next.js · React · Tailwind v4</span>
          <span aria-hidden className="text-[color:var(--violet)]">·</span>
          <span className="text-muted/70">v0.2 · dark research lab</span>
        </div>
      </div>
    </footer>
  );
}
