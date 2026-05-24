import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-aurora text-white border border-transparent hover:shadow-[0_0_24px_rgba(139,92,246,0.45)]",
  secondary: "glass text-foreground hover:border-[color:var(--violet)]/40",
  ghost:
    "bg-transparent text-foreground hover:bg-[color:var(--surface-2)] border border-transparent",
  outline:
    "bg-transparent text-foreground hover:bg-[color:var(--surface-2)] border border-border-strong",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-xs rounded-md",
  md: "h-9 px-4 text-sm rounded-lg",
  lg: "h-11 px-5 text-base rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", className, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...rest}
      />
    );
  },
);
