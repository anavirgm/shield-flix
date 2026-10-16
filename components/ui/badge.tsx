import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "border-border bg-surface text-muted",
        brand: "border-brand/30 bg-brand/15 text-brand-soft",
        success: "border-success/30 bg-success/15 text-success",
        warning: "border-warning/30 bg-warning/15 text-warning",
        danger: "border-danger/30 bg-danger/15 text-danger",
        outline: "border-border bg-transparent text-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-[0.6875rem]",
        md: "px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  },
);

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
