"use client";

import { Card } from "@/components/Card";
import type { Project } from "@/data/content";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card
        hover
        className="flex h-full cursor-pointer flex-col transition-colors hover:border-indigo-200 dark:hover:border-indigo-800"
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.title}`}
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs font-medium text-indigo-600 dark:text-indigo-400">
          Click to view details &rarr;
        </p>
      </Card>
    </motion.div>
  );
}
