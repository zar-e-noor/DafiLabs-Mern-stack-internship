import { FadeInView } from "@/components/FadeInView";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <FadeInView className="mb-12 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </FadeInView>
  );
}
