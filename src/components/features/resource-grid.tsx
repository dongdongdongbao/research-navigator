"use client";

import { ResourceCard } from "@/components/features/resource-card";
import type { Resource } from "@/lib/types";

interface ResourceGridProps {
  list: Resource[];
  onOpen: (id: string) => void;
  onTagClick: (tag: string) => void;
}

export function ResourceGrid({ list, onOpen, onTagClick }: ResourceGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {list.map((r) => (
        <ResourceCard
          key={r.id}
          resource={r}
          onOpen={onOpen}
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
}
