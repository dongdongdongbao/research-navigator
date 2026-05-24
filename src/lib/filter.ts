import type { CategorySlug, Resource } from "@/lib/types";
import { search } from "@/lib/search";

interface FilterInput {
  resources: Resource[];
  category: CategorySlug | null;
  tags: string[];
  query: string;
}

export function applyFilters({
  resources,
  category,
  tags,
  query,
}: FilterInput): Resource[] {
  let out = resources;
  if (category) {
    out = out.filter((r) => r.category === category);
  }
  if (tags.length) {
    out = out.filter((r) => tags.every((t) => r.tags.includes(t)));
  }
  if (query) {
    out = search(out, query);
  }
  return out;
}
