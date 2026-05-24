"use client";

import { Drawer } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { categoryBySlug } from "@/data/categories";
import type { Resource } from "@/lib/types";

interface ResourceDrawerProps {
  resource: Resource | null;
  onClose: () => void;
  onTagClick: (tag: string) => void;
}

const pricingLabel: Record<Resource["pricing"], string> = {
  free: "免费",
  freemium: "免费 + 付费",
  paid: "付费",
  "academic-free": "学术免费",
};

const audienceLabel: Record<string, string> = {
  undergrad: "本科生",
  grad: "研究生",
  researcher: "科研人员",
  "cross-discipline": "跨学科",
};

const languageLabel: Record<string, string> = {
  zh: "中文",
  en: "英文",
  multi: "多语言",
};

export function ResourceDrawer({
  resource,
  onClose,
  onTagClick,
}: ResourceDrawerProps) {
  const open = resource !== null;
  const cat = resource ? categoryBySlug.get(resource.category) : null;

  return (
    <Drawer open={open} onClose={onClose} title={resource?.name ?? ""}>
      {resource && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2">
            {cat && (
              <Badge tone="soft">
                <Icon name={cat.iconKey} size={12} aria-hidden />
                {cat.name}
              </Badge>
            )}
            <Badge tone="outline">{pricingLabel[resource.pricing]}</Badge>
            {resource.featured && (
              <Badge tone="accent">
                <span className="text-[10px]">★</span> Featured
              </Badge>
            )}
          </div>

          {resource.nameEn && (
            <p className="font-mono text-xs text-muted -mt-4 uppercase tracking-widest">
              {resource.nameEn}
            </p>
          )}

          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-xl bg-aurora text-white font-medium hover:shadow-[0_0_28px_rgba(139,92,246,0.5)] transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
          >
            <Icon name="external" size={16} aria-hidden />
            访问 {resource.name}
          </a>

          <p className="text-[15px] leading-relaxed text-foreground">
            {resource.longDescription ?? resource.description}
          </p>

          {resource.highlights && resource.highlights.length > 0 && (
            <section className="flex flex-col gap-2">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">
                亮点
              </h3>
              <ul className="flex flex-col gap-2">
                {resource.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-2 inline-block size-1.5 rounded-full bg-[color:var(--cyan)] shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    />
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="flex flex-col gap-2">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">
              标签
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {resource.tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    onTagClick(t);
                    onClose();
                  }}
                  className="inline-flex items-center h-7 px-2.5 rounded-full text-xs glass hover:border-[color:var(--violet)]/40 hover:text-[color:var(--violet)] transition-colors"
                >
                  #{t}
                </button>
              ))}
            </div>
          </section>

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Meta label="适用人群">
              {resource.audience
                .map((a) => audienceLabel[a] ?? a)
                .join("、")}
            </Meta>
            <Meta label="语言">
              {resource.language.map((l) => languageLabel[l] ?? l).join("、")}
            </Meta>
            <Meta label="收录日期">
              <span className="font-mono text-xs text-muted">
                {resource.addedAt}
              </span>
            </Meta>
            <Meta label="链接">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--cyan)] hover:underline break-all text-xs font-mono"
              >
                {resource.url.replace(/^https?:\/\//, "")}
              </a>
            </Meta>
          </dl>
        </div>
      )}
    </Drawer>
  );
}

function Meta({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">
        {label}
      </dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}
