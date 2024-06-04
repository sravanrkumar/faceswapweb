"use client";
import { Label } from "./label";
import { AlertTriangle } from "lucide-react";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { LockKeyhole } from "lucide-react";

import * as React from "react";

import { mergeClassNames } from "@/lib/className.utils";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  defaultMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, errorMessage, register, defaultMessage, ...props },
    ref,
  ) => {
    const [isHidden, setHidden] = React.useState<boolean>(true);

    return (
      <div>
        <Label
          htmlFor="Password"
          className={mergeClassNames(
            "font-bold text-xs",
            errorMessage ? "text-red-650" : "",
          )}
        >
          {label}
        </Label>
        <div
          className={mergeClassNames(
            "flex justify-between align-middle h-9 w-full rounded-md border border-input bg-gray-50 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden group relative",
            className,
          )}
        >
          <div className="self-center mx-3 absolute">
            <LockKeyhole strokeWidth={"1.5px"} width={"18px"} />
          </div>
          <input
            className={mergeClassNames(
              "w-full focus-visible:outline-none bg-transparent group-focus-within:bg-blue-50 pl-10 border-red-650",
              errorMessage ? "border-b-2" : "",
            )}
            type={isHidden ? "password" : "text"}
            ref={ref}
            {...props}
            {...register}
          />
          {errorMessage ? (
            <span className="inline-block self-center absolute right-9">
              <AlertTriangle
                className="text-red-650"
                strokeWidth={"1.5px"}
                width={"18px"}
              />
            </span>
          ) : null}

          <Button
            type="button"
            onClick={() => setHidden(!isHidden)}
            variant={"outline"}
            className="border-none bg-gray-100 rounded-none px-1.5 border-0 h-full"
          >
            {isHidden ? (
              <Eye
                className="text-blue-400"
                strokeWidth={"1.5px"}
                width={"18px"}
              />
            ) : (
              <EyeOff
                className="text-blue-400"
                strokeWidth={"1.5px"}
                width={"18px"}
              />
            )}
          </Button>
        </div>
        <p
          className={mergeClassNames(
            "text-xs text-gray-500 mt-1",
            errorMessage ? "text-red-650" : "",
          )}
        >
          {errorMessage ? (errorMessage as string) : (defaultMessage as string)}
        </p>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
