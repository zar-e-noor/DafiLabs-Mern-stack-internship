import { Button } from "@/components/Button";
import { FadeInView } from "@/components/FadeInView";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { Section } from "@/components/Section";
import { content } from "@/data/content";
import Link from "next/link";

export default function HomePage() {
  const skillCategories = [...new Set(content.skills.map((s) => s.category))];

  return (
    <>
      {/* Hero */}
      <Section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
        <FadeInView>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {content.personal.title}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-50">
            Hi, I&apos;m{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              {content.personal.name}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-400">
            {content.personal.tagline}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 dark:text-slate-500">
            {content.personal.intro}
          </p>
        </FadeInView>

        <FadeInView delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/projects">
            <Button size="lg">View Projects</Button>
          </Link>
          <ResumeDownloadButton />
        </FadeInView>
      </Section>

      {/* Skills preview */}
      <Section className="pb-24">
        <FadeInView>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Skills & Technologies
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Tools and technologies I work with
            </p>
          </div>
        </FadeInView>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <FadeInView key={category} delay={i * 0.1}>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {content.skills
                    .filter((s) => s.category === category)
                    .map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        <FadeInView delay={0.2} className="mt-10 text-center">
          <Link href="/about">
            <Button variant="ghost">
              Learn more about me &rarr;
            </Button>
          </Link>
        </FadeInView>
      </Section>
    </>
  );
}
