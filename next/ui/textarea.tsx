import React from "react";
import clsx from "clsx";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        rows={5}
        className={clsx(
          "flex w-full rounded-md border border-foreground/30 bg-background px-2 py-1.5 text-md text-foreground",
          "placeholder:text-stone",
          "hover:enabled:border-foreground",
          "focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-60 focus:ring-primary-500 active:enabled:ring-primary-500",
          "disabled:cursor-not-allowed disabled:border-finnishwinter disabled:bg-finnishwinter disabled:text-finnishwinter",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";
