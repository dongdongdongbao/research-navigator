"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/icon";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/cn";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const containerRef = useFocusTrap<HTMLDivElement>(open);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof window === "undefined") return null;
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="关闭"
        onClick={onClose}
        className="absolute inset-0 motion-safe:animate-[fade-in_120ms_ease-out]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(7,5,12,0.65) 0%, rgba(7,5,12,0.85) 100%)",
          backdropFilter: "blur(8px) saturate(120%)",
          WebkitBackdropFilter: "blur(8px) saturate(120%)",
        }}
      />
      <div
        ref={containerRef}
        className={cn(
          "glass glass-strong absolute flex flex-col motion-safe:transition-transform",
          isDesktop
            ? "top-0 right-0 h-full w-full max-w-[480px] rounded-l-2xl motion-safe:animate-[slide-in-right_180ms_ease-out]"
            : "left-0 right-0 bottom-0 max-h-[88vh] rounded-t-2xl motion-safe:animate-[slide-in-up_220ms_ease-out]",
        )}
      >
        <header className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border">
          <h2
            id={titleId}
            className="font-display text-xl font-semibold tracking-tight truncate"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭抽屉"
            className="inline-flex items-center justify-center size-9 rounded-lg glass hover:border-[color:var(--violet)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
          >
            <Icon name="close" size={16} aria-hidden />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slide-in-right { from { transform: translateX(100%) } to { transform: translateX(0) } }
        @keyframes slide-in-up { from { transform: translateY(100%) } to { transform: translateY(0) } }
      `}</style>
    </div>,
    document.body,
  );
}
