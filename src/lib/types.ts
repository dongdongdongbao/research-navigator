export type CategorySlug =
  | "paper-search"
  | "preprint"
  | "code"
  | "open-data"
  | "literature-graph"
  | "dataset"
  | "writing";

export type AccentKey =
  | "cyan"
  | "indigo"
  | "amber"
  | "rose"
  | "emerald"
  | "violet"
  | "sky";

export type IconKey =
  | "paper-search"
  | "preprint"
  | "code"
  | "open-data"
  | "literature-graph"
  | "dataset"
  | "writing"
  | "search"
  | "external"
  | "close"
  | "sun"
  | "moon"
  | "system"
  | "filter"
  | "chevron-down"
  | "x";

export interface Category {
  slug: CategorySlug;
  name: string;
  nameEn: string;
  description: string;
  iconKey: IconKey;
  accent: AccentKey;
}

export type Pricing = "free" | "freemium" | "paid" | "academic-free";

export type Audience =
  | "undergrad"
  | "grad"
  | "researcher"
  | "cross-discipline";

export type Language = "zh" | "en" | "multi";

export interface Resource {
  id: string;
  name: string;
  nameEn?: string;
  url: string;
  category: CategorySlug;
  tags: string[];
  description: string;
  longDescription?: string;
  highlights?: string[];
  pricing: Pricing;
  audience: Audience[];
  language: Language[];
  featured?: boolean;
  addedAt: string;
}

export interface UrlState {
  q: string;
  cat: CategorySlug | null;
  tags: string[];
  id: string | null;
}

export type ThemeMode = "light" | "dark" | "system";
