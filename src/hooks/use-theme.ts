"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { ThemeMode } from "@/lib/types";

const STORAGE_KEY = "rn-theme";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (typeof window === "undefined") {
    return () => {
      listeners.delete(cb);
    };
  }
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "light" || raw === "dark" ? raw : "system";
}

function getServerSnapshot(): ThemeMode {
  return "system";
}

function applyResolved(mode: ThemeMode) {
  if (typeof window === "undefined") return;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved =
    mode === "system" ? (systemDark ? "dark" : "light") : mode;
  document.documentElement.setAttribute("data-theme", resolved);
}

export function useTheme() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyResolved(mode);
    if (mode !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyResolved("system");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    if (next === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
    notify();
  }, []);

  const cycle = useCallback(() => {
    const cur = getSnapshot();
    const next: ThemeMode =
      cur === "system" ? "light" : cur === "light" ? "dark" : "system";
    setMode(next);
  }, [setMode]);

  return { mode, setMode, cycle };
}
