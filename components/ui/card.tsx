import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl p-6",
        className,
      )}
      {...props}
    />
  );
}
