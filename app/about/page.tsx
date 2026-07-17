import { FadeInView } from "@/components/FadeInView";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { content } from "@/data/content";

export default function AboutPage() {
  const skillCategories = [...new Set(content.skills.map((s) => s.category))];

  return (
    <Section className="py-16 sm:py-24">
      <PageHeader title="About Me" subtitle={content.personal.title} />

      <div className="grid gap-12 lg:grid-cols-2">
        <FadeInView>
          <div className="space-y-6">
            {content.personal.bio.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-slate-600 dark:text-slate-400"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeInView>

        <FadeInView delay={0.15}>
          <div className="space-y-8">
            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Education
              </h2>
              <p className="text-base text-slate-700 dark:text-slate-300">
                {content.personal.education}
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Background
              </h2>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {content.personal.background}
              </p>
            </div>
          </div>
        </FadeInView>
      </div>

      <FadeInView delay={0.2} className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-slate-50">
          Skills
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
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
          ))}
        </div>
      </FadeInView>
    </Section>
  );
}
