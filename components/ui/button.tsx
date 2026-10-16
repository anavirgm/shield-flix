import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2",
    "rounded-xl font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out-quart",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: "bg-brand-strong text-white hover:bg-brand-deep",
        secondary: "border border-border bg-surface text-foreground hover:bg-surface-hover",
        outline:
          "border border-border bg-transparent text-foreground hover:border-brand/60 hover:bg-surface",
        ghost: "bg-transparent text-muted hover:bg-surface hover:text-foreground",
        danger: "bg-danger-strong text-white hover:bg-danger-deep",
      },
      size: {
        sm: "h-9 px-3 text-sm [&_svg]:size-4",
        md: "h-11 px-5 text-sm [&_svg]:size-4",
        lg: "h-12 px-7 text-base [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-5",
      },
      block: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = Omit<ComponentProps<"button">, "size"> &
  VariantProps<typeof buttonVariants> & {
    /** Muestra el spinner, bloquea la interacción y anuncia el estado. */
    isLoading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  block,
  isLoading = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      type={type}
      aria-busy={isLoading || undefined}
      disabled={disabled === true || isLoading}
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...props}
    >
      {isLoading ? <Spinner size="sm" label="Procesando" /> : null}
      {children}
    </button>
  );
}

export { Button, buttonVariants };
