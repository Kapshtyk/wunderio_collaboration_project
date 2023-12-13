import React from "react";
import clsx from "clsx";
import { cva } from "cva";

export const buttonVariants = cva(
  "flex gap-2 items-center rounded-lg transition-colors duration-200 active:scale-[0.98] disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-500 text-white",
          "hover:bg-primary-500/80 hover:text-white",
          "disabled:!border-primary-500/20 disabled:!text-white/20 disabled:!bg-primary-500/20",
        ],
        secondary: [
          "bg-background text-main border-main border",
          "hover:bg-primary-50 hover:text-primary-500 hover:border-primary-500",
          "disabled:!border-primary-200 disabled:!text-primary-200 disabled:!bg-foreground",
        ],
        tertiary: [
          "bg-transparent text-foreground",
          "hover:hover:text-foreground/80",
          /* "hover:bg-primary-50 hover:text-primary-600 hover:border-transparent",
          "active:bg-primary-50 active:text-primary-600 active:border-transparent",
          "disabled:!border-transparent disabled:!text-primary-200", */
        ],
      },
      size: {
        xs: "text-xs h-8 font-semibold py-2 px-3",
        sm: "text-sm h-9 font-semibold py-2 px-3",
        md: "text-sm h-10 font-semibold py-[10px] px-4",
        lg: "text-md h-12 font-semibold py-3 px-5 gap-2",
        xl: "text-md h-14 font-semibold py-4 px-6 gap-2",
      },
    },
  },
);
<div className="h-14" />;
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children?: React.ReactNode;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", children, className, ...props },
    ref,
  ) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
