import * as React from "react";

import { mergeClassNames } from "@/lib/className.utils";
import { Label } from "./label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string,
  placeholder?: string,
  register?: any,
  errorMessage?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label,id,
    placeholder,
    register,
    errorMessage, ...props }, ref) => {
    return (
      <div className="grid items-center gap-1.5 w-full">
        <Label htmlFor={id} className="font-semibold text-xs">
          {label}
        </Label>
        <textarea
          className={mergeClassNames(
            "flex h-[10rem] resize-none w-full rounded-md border border-input bg-gray-50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50  focus-visible:bg-blue-50",
            className,
          )}
          ref={ref}
          {...props}
          {...register}
          placeholder={placeholder}
        />
        {errorMessage && (
        <p className="font-medium text-red-500 text-xs mt-1">
          {errorMessage as string}
        </p>
      )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
