'use client';

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";

interface LineShadowTextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  shadowColor?: string;
  as?: React.ElementType;
  text: string; // 👈 Change: Require 'text' prop and make it a string
}

export function LineShadowText({
  text, // 👈 Change: Use 'text' prop instead of 'children'
  shadowColor = "black",
  className,
  as: Component = "span",
  ...props
}: LineShadowTextProps) {
  const MotionComponent = motion.create(Component);
  // const content = typeof children === "string" ? children : null; // ❌ Remove this line
  const content = text; // 👈 Change: Use 'text' directly

  // Remove the check as we now expect 'text' to be provided
  // if (!content) {
  //   throw new Error("LineShadowText only accepts string content");
  // }

  return (
    <MotionComponent
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
      className={cn(
        "relative z-0 inline-flex",
        "after:absolute after:left-[0.04em] after:top-[0.04em] after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",
        "after:-z-10 after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        className,
      )}
      data-text={content} // 👈 Keep using 'content' (which is now 'text')
      {...props}
    >
      {content} {/* 👈 Keep rendering 'content' (which is now 'text') */}
    </MotionComponent>
  );
}