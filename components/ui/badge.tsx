import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-primary/30 bg-primary/12 px-3 py-1 text-xs font-medium tracking-wide text-blue-100",
        className,
      )}
      {...props}
    />
  );
}
