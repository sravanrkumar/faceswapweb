import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { mergeClassNames } from "@/lib/className.utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        orange:
          "border-transparent bg-orange-200 text-secondary-foreground shadow hover:bg-orange-200/80",
        blue: "border-transparent bg-blue-100 text-secondary-foreground shadow hover:bg-blue-100/80",
        purple:
          "border-transparent bg-purple-200 text-secondary-foreground shadow hover:bg-purple-200/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={mergeClassNames(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
