"use client";

import { FadeInView } from "@/components/FadeInView";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { Section } from "@/components/Section";
import { content, type Project } from "@/data/content";
import { useState } from "react";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section className="py-16 sm:py-24">
      <PageHeader
        title="Projects"
        subtitle="A selection of things I've built — click any card to see more details."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.projects.map((project, i) => (
          <FadeInView key={project.id} delay={i * 0.08}>
            <ProjectCard
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          </FadeInView>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Section>
  );
}
