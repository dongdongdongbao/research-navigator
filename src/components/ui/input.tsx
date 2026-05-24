import { cn } from "@/lib/cn";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "glass w-full h-10 px-3 rounded-lg text-foreground placeholder:text-muted/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[color:var(--background)]",
        invalid && "border-[color:#ef4444]",
        className,
      )}
      {...rest}
    />
  );
});
