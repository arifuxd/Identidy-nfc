import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl text-xs font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-3.5",
  {
    variants: {
      variant: {
        primary:
          "bg-primary px-3.5 py-2 text-white shadow-[0_10px_24px_rgba(37,99,235,0.28)] hover:bg-primary-strong",
        secondary:
          "border border-border bg-white/5 px-3.5 py-2 text-white hover:bg-white/8",
        ghost: "px-2.5 py-1.5 text-muted hover:bg-white/5 hover:text-white",
        danger:
          "bg-danger px-3.5 py-2 text-white shadow-[0_10px_24px_rgba(239,68,68,0.2)] hover:opacity-90",
      },
      size: {
        default: "",
        sm: "px-3 py-1.5 text-[11px]",
        lg: "px-4 py-2.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  ),
);

Button.displayName = "Button";
