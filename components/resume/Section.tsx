import { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  isEmpty?: boolean;
  className?: string;
}

/**
 * Smart section component that hides itself when empty
 * Prevents rendering empty sections in the resume
 */
export function Section({ title, children, isEmpty, className = "" }: SectionProps) {
  if (isEmpty) return null;

  return (
    <section className={`break-inside-avoid ${className}`}>
      <h2 className="text-xl font-bold mb-3 break-after-avoid border-b-2 border-gray-800 pb-1">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
