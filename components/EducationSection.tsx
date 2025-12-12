import { Education } from "@/types";

interface EducationSectionProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationSectionProps) {
  if (!education || education.length === 0) {
    return null;
  }

  const formatDate = (date: string | null, isCurrent: boolean): string => {
    if (isCurrent) return "Present";
    if (!date) return "";
    return date;
  };

  return (
    <section>
      {/* Section Header */}
      <h2
        className="mb-2 mt-6 uppercase"
        style={{
          fontFamily: "var(--font-merriweather)",
          fontSize: "0.875rem",
          fontWeight: 700,
          borderBottom: "1px solid #000000",
          paddingBottom: "4px",
        }}
      >
        Education
      </h2>

      {/* Education Items */}
      <div>
        {education.map((edu) => (
          <article
            key={edu.id}
            style={{
              marginBottom: "4mm",
            }}
          >
            {/* Row 1: Degree (left, bold) and Dates (right, nowrap) */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "0.5rem",
                marginBottom: "2px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-merriweather)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  flex: 1,
                }}
              >
                {edu.degree} in {edu.field}
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-open-sans)",
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {formatDate(edu.startDate, false)} —{" "}
                {formatDate(edu.endDate, edu.current)}
              </span>
            </div>

            {/* Row 2: Institution (left, italic) and Location (right) */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "0.5rem",
                marginBottom: "4px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-open-sans)",
                  fontSize: "0.875rem",
                  fontStyle: "italic",
                  flex: 1,
                }}
              >
                {edu.institution}
              </span>
              {edu.location && (
                <span
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    fontSize: "0.875rem",
                    flexShrink: 0,
                  }}
                >
                  {edu.location}
                </span>
              )}
            </div>

            {/* Achievements (optional) */}
            {edu.achievements && edu.achievements.length > 0 && (
              <ul
                style={{
                  listStyleType: "disc",
                  listStylePosition: "outside",
                  paddingLeft: "1.5em",
                  margin: 0,
                  fontFamily: "var(--font-open-sans)",
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                }}
              >
                {edu.achievements.map((achievement, index) => (
                  <li key={index} style={{ marginBottom: "2px" }}>
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>

      {/* Print styles for page breaks */}
      <style jsx>{`
        @media print {
          article {
            break-inside: avoid;
          }
        }
      `}</style>
    </section>
  );
}
