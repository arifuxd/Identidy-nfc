import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn("input-base min-h-28 resize-y", className)}
      ref={ref}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
