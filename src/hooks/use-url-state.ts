"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CategorySlug, UrlState } from "@/lib/types";

const PARAM_Q = "q";
const PARAM_CAT = "cat";
const PARAM_TAGS = "tags";
const PARAM_ID = "id";

type Patch = Partial<{
  q: string;
  cat: CategorySlug | null;
  tags: string[];
  id: string | null;
}>;

export function useUrlState(): readonly [UrlState, (patch: Patch) => void] {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const state: UrlState = useMemo(() => {
    const q = sp.get(PARAM_Q) ?? "";
    const cat = (sp.get(PARAM_CAT) as CategorySlug | null) ?? null;
    const rawTags = sp.get(PARAM_TAGS);
    const tags = rawTags ? rawTags.split(",").filter(Boolean) : [];
    const id = sp.get(PARAM_ID);
    return { q, cat, tags, id };
  }, [sp]);

  const patchUrl = useCallback(
    (patch: Patch) => {
      const next = new URLSearchParams(sp.toString());

      if (patch.q !== undefined) {
        if (patch.q) next.set(PARAM_Q, patch.q);
        else next.delete(PARAM_Q);
      }
      if (patch.cat !== undefined) {
        if (patch.cat) next.set(PARAM_CAT, patch.cat);
        else next.delete(PARAM_CAT);
      }
      if (patch.tags !== undefined) {
        if (patch.tags.length) next.set(PARAM_TAGS, patch.tags.join(","));
        else next.delete(PARAM_TAGS);
      }
      if (patch.id !== undefined) {
        if (patch.id) next.set(PARAM_ID, patch.id);
        else next.delete(PARAM_ID);
      }

      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [sp, router, pathname],
  );

  return [state, patchUrl] as const;
}
