"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface FadeInViewProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
}

export function FadeInView({ children, delay = 0, ...props }: FadeInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
