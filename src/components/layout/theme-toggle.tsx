"use client";

import { useTheme } from "@/hooks/use-theme";
import { Icon } from "@/components/ui/icon";
import type { IconKey, ThemeMode } from "@/lib/types";

const ICON: Record<ThemeMode, IconKey> = {
  system: "system",
  light: "sun",
  dark: "moon",
};

const LABEL: Record<ThemeMode, string> = {
  system: "跟随系统",
  light: "浅色模式",
  dark: "深色模式",
};

export function ThemeToggle() {
  const { mode, cycle } = useTheme();

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`切换主题（当前：${LABEL[mode]}）`}
      title={LABEL[mode]}
      className="inline-flex items-center justify-center size-9 rounded-lg glass text-foreground hover:text-[color:var(--violet)] hover:border-[color:var(--violet)]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
    >
      <Icon name={ICON[mode]} size={16} aria-hidden />
    </button>
  );
}
