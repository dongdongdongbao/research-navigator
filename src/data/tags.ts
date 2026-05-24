import type { Resource } from "@/lib/types";

export const tagWhitelist = [
  "AI",
  "Biology",
  "Physics",
  "Math",
  "CS",
  "Social Science",
  "Medicine",
  "Multidisciplinary",
  "Open Source",
  "Free",
  "Chinese",
  "Citation",
  "Visualization",
  "Reproducibility",
  "Collaboration",
  "LaTeX",
  "Benchmark",
  "Government",
  "Cloud",
  "Reference Manager",
] as const;

export type Tag = (typeof tagWhitelist)[number];

export const tagSet: Set<string> = new Set(tagWhitelist);

export function countByTag(resources: Resource[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const r of resources) {
    for (const t of r.tags) {
      m.set(t, (m.get(t) ?? 0) + 1);
    }
  }
  return m;
}
