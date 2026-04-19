import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-primary px-5 py-3 text-white shadow-[0_16px_40px_rgba(37,99,235,0.35)] hover:bg-primary-strong",
        secondary:
          "border border-border bg-white/5 px-5 py-3 text-white hover:bg-white/8",
        ghost: "px-4 py-2 text-muted hover:bg-white/5 hover:text-white",
        danger:
          "bg-danger px-5 py-3 text-white shadow-[0_16px_40px_rgba(239,68,68,0.25)] hover:opacity-90",
      },
      size: {
        default: "",
        sm: "px-4 py-2 text-xs",
        lg: "px-6 py-3.5 text-base",
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
