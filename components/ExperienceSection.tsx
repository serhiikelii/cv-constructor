import { Experience } from "@/types";

interface ExperienceSectionProps {
  experiences: Experience[];
  spacingScale?: number;
  fontScale?: number;
}

export default function ExperienceSection({
  experiences,
  spacingScale = 1.0,
  fontScale = 1.0,
}: ExperienceSectionProps) {
  const placeholderOpacity = "opacity-50";
  const hasExperience = experiences && experiences.length > 0;

  const formatDate = (date: string | null, isCurrent: boolean): string => {
    if (isCurrent) return "Present";
    if (!date) return "";
    // Format: "Jan 2020" or similar
    return date;
  };

  // Scaled style values
  const styles = {
    sectionTitle: {
      fontFamily: "var(--font-merriweather)",
      fontSize: `calc(0.875rem * ${fontScale})`,
      fontWeight: 700,
      borderBottom: "1px solid #000000",
      paddingBottom: `calc(4px * ${spacingScale})`,
      marginTop: `calc(24px * ${spacingScale})`,
      marginBottom: `calc(8px * ${spacingScale})`,
    },
    placeholderText: {
      fontFamily: "var(--font-open-sans)",
      fontSize: `calc(0.875rem * ${fontScale})`,
      marginTop: `calc(8px * ${spacingScale})`,
      marginBottom: `calc(12px * ${spacingScale})`,
    },
    article: {
      marginBottom: `calc(4mm * ${spacingScale})`,
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: `calc(0.5rem * ${spacingScale})`,
      marginBottom: `calc(2px * ${spacingScale})`,
    },
    rowLast: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: `calc(0.5rem * ${spacingScale})`,
      marginBottom: `calc(4px * ${spacingScale})`,
    },
    position: {
      fontFamily: "var(--font-merriweather)",
      fontSize: `calc(0.875rem * ${fontScale})`,
      fontWeight: 700,
      flex: 1,
    },
    date: {
      fontFamily: "var(--font-open-sans)",
      fontSize: `calc(0.875rem * ${fontScale})`,
      whiteSpace: "nowrap" as const,
      flexShrink: 0,
    },
    company: {
      fontFamily: "var(--font-open-sans)",
      fontSize: `calc(0.875rem * ${fontScale})`,
      fontStyle: "italic",
      flex: 1,
    },
    location: {
      fontFamily: "var(--font-open-sans)",
      fontSize: `calc(0.875rem * ${fontScale})`,
      flexShrink: 0,
    },
    description: {
      listStyleType: "disc" as const,
      listStylePosition: "outside" as const,
      paddingLeft: `calc(1.5em * ${spacingScale})`,
      margin: 0,
      fontFamily: "var(--font-open-sans)",
      fontSize: `calc(0.875rem * ${fontScale})`,
      lineHeight: "1.6",
    },
    descriptionItem: {
      marginBottom: `calc(2px * ${spacingScale})`,
    },
  };

  return (
    <section>
      {/* Section Header */}
      <h2 className="uppercase" style={styles.sectionTitle}>
        Experience
      </h2>

      {/* Instructional text when no experience */}
      {!hasExperience && (
        <p className={placeholderOpacity} style={styles.placeholderText}>
          Summarize your work experience by listing each job and your responsibilities in 2-3 lines. Start with your most recent job and work backwards using the format below.
        </p>
      )}

      {/* Experience Items */}
      <div>
        {hasExperience ? (
          experiences.map((exp) => (
            <article key={exp.id} style={styles.article}>
              {/* Row 1: Position (left, bold) and Dates (right, nowrap) */}
              <div style={styles.row}>
                <h3 style={styles.position}>{exp.position}</h3>
                <span style={styles.date}>
                  {formatDate(exp.startDate, false)} —{" "}
                  {formatDate(exp.endDate, exp.current)}
                </span>
              </div>

              {/* Row 2: Company (left, italic) and Location (right) */}
              <div style={styles.rowLast}>
                <span style={styles.company}>{exp.company}</span>
                <span style={styles.location}>{exp.location}</span>
              </div>

              {/* Description: Bulleted List */}
              {exp.description && exp.description.length > 0 && (
                <ul style={styles.description}>
                  {exp.description.map((item, index) => (
                    <li key={index} style={styles.descriptionItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))
        ) : (
          /* Placeholder examples */
          <div className={placeholderOpacity}>
            {/* Job 1 */}
            <article style={styles.article}>
              <div style={styles.row}>
                <h3 style={styles.position}>Job Title 1</h3>
                <span style={styles.date}>Month/year — Month/year</span>
              </div>
              <div style={styles.rowLast}>
                <span style={styles.company}>Company Name</span>
                <span style={styles.location}>City, Country</span>
              </div>
              <ul style={styles.description}>
                <li style={styles.descriptionItem}>Responsibilities</li>
                <li style={styles.descriptionItem}>Responsibilities</li>
                <li style={styles.descriptionItem}>Responsibilities</li>
              </ul>
            </article>

            {/* Job 2 */}
            <article style={styles.article}>
              <div style={styles.row}>
                <h3 style={styles.position}>Job Title 2</h3>
                <span style={styles.date}>Month/year — Month/year</span>
              </div>
              <div style={styles.rowLast}>
                <span style={styles.company}>Company Name</span>
                <span style={styles.location}>City, Country</span>
              </div>
              <ul style={styles.description}>
                <li style={styles.descriptionItem}>Responsibilities</li>
                <li style={styles.descriptionItem}>Responsibilities</li>
                <li style={styles.descriptionItem}>Responsibilities</li>
              </ul>
            </article>
          </div>
        )}
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
