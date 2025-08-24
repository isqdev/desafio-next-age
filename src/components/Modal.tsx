import type { ComponentProps, ReactNode } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps extends ComponentProps<"div"> {
  open: boolean;
  onClose: () => void;
  width?: "md" | "lg" ;
}

const widthMap = {
  md: "max-w-xl",
  lg: "max-w-sm",
};

export function Modal({
  className,
  children,
  open = false,
  onClose,
  width = "lg",
  ...props
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex sm:items-center sm:justify-center bg-black/30 overflow-y-auto`}
      onClick={onClose}
    >
      <div
        className={twMerge(
          `p-4 sm:p-6 m-2 sm:m-5 w-full rounded-2xl bg-white ${widthMap[width]} my-auto`,
          className
        )}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        {...props}
      >
        {children || "vazio"}
      </div>
    </div>
  );
}


