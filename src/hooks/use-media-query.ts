"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string) {
  return (cb: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mql = window.matchMedia(query);
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  };
}

function getSnapshot(query: string) {
  return () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };
}

function getServerSnapshot() {
  return false;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    getSnapshot(query),
    getServerSnapshot,
  );
}
