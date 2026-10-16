import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/utils/cn";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SpinnerProps = Omit<ComponentProps<"svg">, "size"> &
  VariantProps<typeof spinnerVariants> & {
    /** Nombre accesible. Cámbialo cuando el spinner no acompañe a un texto visible. */
    label?: string;
  };

/**
 * Indicador de progreso indeterminado. Anuncia el estado a lectores de pantalla
 * mediante `role="status"` y expone `aria-label`.
 */
export function Spinner({ className, size, label = "Cargando", ...props }: SpinnerProps) {
  return (
    <LoaderCircle
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn("shrink-0", spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

export { spinnerVariants };
