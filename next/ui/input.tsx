import React from "react";
import clsx from "clsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={clsx(
          "flex w-full h-10 rounded-md border border-graysuit bg-white px-2 py-1.5 text-md text-steelgray",
          "placeholder:text-stone",
          "hover:enabled:border-steelgray",
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
Input.displayName = "Input";
