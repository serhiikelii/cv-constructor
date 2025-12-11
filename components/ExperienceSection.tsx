import { Experience } from "@/types";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  const formatDate = (date: string | null, isCurrent: boolean): string => {
    if (isCurrent) return "Present";
    if (!date) return "";
    // Format: "Jan 2020" or similar
    return date;
  };

  return (
    <section>
      {/* Section Header */}
      <h2
        className="mb-2 mt-6 uppercase"
        style={{
          fontFamily: "var(--font-merriweather)",
          fontSize: "0.875rem", // 14px ≈ 10.5pt
          fontWeight: 700,
          borderBottom: "1px solid #000000",
          paddingBottom: "4px",
        }}
      >
        Experience
      </h2>

      {/* Experience Items */}
      <div>
        {experiences.map((exp) => (
          <article
            key={exp.id}
            style={{
              marginBottom: "4mm",
            }}
          >
            {/* Row 1: Position (left, bold) and Dates (right, nowrap) */}
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
                {exp.position}
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-open-sans)",
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {formatDate(exp.startDate, false)} —{" "}
                {formatDate(exp.endDate, exp.current)}
              </span>
            </div>

            {/* Row 2: Company (left, italic) and Location (right) */}
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
                {exp.company}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-open-sans)",
                  fontSize: "0.875rem",
                  flexShrink: 0,
                }}
              >
                {exp.location}
              </span>
            </div>

            {/* Description: Bulleted List */}
            {exp.description && exp.description.length > 0 && (
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
                {exp.description.map((item, index) => (
                  <li key={index} style={{ marginBottom: "2px" }}>
                    {item}
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
