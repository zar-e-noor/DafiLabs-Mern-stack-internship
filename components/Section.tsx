import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
}

export function Section({ className, as: Tag = "section", children, ...props }: SectionProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
