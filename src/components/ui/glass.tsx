import { cn } from "@/lib/cn";

type Tone = "default" | "strong";

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "header" | "footer" | "aside";
  tone?: Tone;
  rounded?: "md" | "lg" | "xl" | "2xl" | "3xl";
}

const roundedMap = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
} as const;

export function Glass({
  as: Tag = "div",
  tone = "default",
  rounded = "xl",
  className,
  children,
  ...rest
}: GlassProps) {
  return (
    <Tag
      className={cn(
        "glass",
        tone === "strong" && "glass-strong",
        roundedMap[rounded],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
