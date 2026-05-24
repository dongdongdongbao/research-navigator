"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
): React.RefObject<T | null> {
  const containerRef = useRef<T>(null);
  const returnRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    returnRef.current = (document.activeElement as HTMLElement) ?? null;
    const root = containerRef.current;
    if (!root) return;
    const focusables = root.querySelectorAll<HTMLElement>(FOCUSABLE);
    const first = focusables[0];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (list.length === 0) {
        e.preventDefault();
        return;
      }
      const firstEl = list[0];
      const lastEl = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === firstEl || !root.contains(active)) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (active === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      returnRef.current?.focus?.();
    };
  }, [active]);

  return containerRef;
}
