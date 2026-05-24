import type { Resource } from "@/lib/types";

export function search(list: Resource[], query: string): Resource[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((r) => {
    const haystack = [
      r.name,
      r.nameEn ?? "",
      r.description,
      r.longDescription ?? "",
      r.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
