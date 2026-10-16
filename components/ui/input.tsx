import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

const inputVariants = cva(
  [
    "w-full rounded-xl border border-border bg-surface/60 text-foreground",
    "placeholder:text-muted",
    "transition-[border-color,box-shadow] duration-200 ease-out-quart",
    "outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-ring/40",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger/30",
  ],
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-5 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type InputProps = Omit<ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>;

function Input({ className, size, type = "text", ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
