import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "paper-search",
    name: "论文搜索",
    nameEn: "Paper Search",
    description: "覆盖主流数据库，从关键词到全文链接的起点。",
    iconKey: "paper-search",
    accent: "sky",
  },
  {
    slug: "preprint",
    name: "预印本",
    nameEn: "Preprints",
    description: "在同行评议之前看到最新的研究成果。",
    iconKey: "preprint",
    accent: "indigo",
  },
  {
    slug: "code",
    name: "代码复现",
    nameEn: "Code & Reproducibility",
    description: "把论文里的实验跑起来，从代码到环境一站搞定。",
    iconKey: "code",
    accent: "emerald",
  },
  {
    slug: "open-data",
    name: "开放数据",
    nameEn: "Open Data",
    description: "可下载、可引用、可再分析的开放数据仓储。",
    iconKey: "open-data",
    accent: "amber",
  },
  {
    slug: "literature-graph",
    name: "文献图谱",
    nameEn: "Literature Graph",
    description: "顺着引用与被引用，绘出领域的脉络。",
    iconKey: "literature-graph",
    accent: "violet",
  },
  {
    slug: "dataset",
    name: "数据集",
    nameEn: "Datasets",
    description: "训练、评测、基准——按任务索引可用的数据集。",
    iconKey: "dataset",
    accent: "rose",
  },
  {
    slug: "writing",
    name: "写作工具",
    nameEn: "Writing Tools",
    description: "从协作排版到引用整理，让写论文不再受工具拖累。",
    iconKey: "writing",
    accent: "cyan",
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
