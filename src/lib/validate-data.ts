import type { CategorySlug, Resource } from "@/lib/types";
import { categories } from "@/data/categories";
import { tagSet } from "@/data/tags";

const categorySlugs: Set<CategorySlug> = new Set(categories.map((c) => c.slug));

export function validateResources(list: Resource[]): void {
  const seenIds = new Set<string>();
  for (const r of list) {
    if (seenIds.has(r.id)) {
      throw new Error(`[validate-data] duplicate resource id: ${r.id}`);
    }
    seenIds.add(r.id);

    if (!categorySlugs.has(r.category)) {
      throw new Error(
        `[validate-data] resource "${r.id}" has unknown category "${r.category}"`,
      );
    }

    if (!r.tags.length) {
      throw new Error(`[validate-data] resource "${r.id}" has no tags`);
    }

    for (const t of r.tags) {
      if (!tagSet.has(t)) {
        throw new Error(
          `[validate-data] resource "${r.id}" uses unknown tag "${t}"`,
        );
      }
    }

    if (!/^https?:\/\//.test(r.url)) {
      throw new Error(`[validate-data] resource "${r.id}" has invalid url`);
    }
  }
}
