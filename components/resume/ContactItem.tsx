import { ReactNode } from "react";

interface ContactItemProps {
  icon: ReactNode;
  value: string;
  href?: string;
  className?: string;
}

/**
 * Smart contact item component that renders only when value exists
 * Prevents empty contact items from taking up space
 */
export function ContactItem({ icon, value, href, className = "" }: ContactItemProps) {
  if (!value) return null;

  const content = (
    <span className="flex items-center gap-2 break-words">
      {icon}
      <span className="text-sm">{value}</span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-blue-600 hover:text-blue-800 transition-colors ${className}`}
      >
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
