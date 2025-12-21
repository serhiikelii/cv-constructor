import { Education, Certification } from "@/types";

interface EducationSectionProps {
  education: Education[];
  certifications?: Certification[];
  spacingScale?: number;
  fontScale?: number;
}

export default function EducationSection({
  education,
  certifications = [],
  spacingScale = 1.0,
  fontScale = 1.0,
}: EducationSectionProps) {
  const placeholderOpacity = "opacity-50";
  const hasEducation = education && education.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

  const formatDate = (date: string | null, isCurrent: boolean): string => {
    if (isCurrent) return "Present";
    if (!date) return "";
    return date;
  };

  // Scaled style values
  const styles = {
    sectionTitle: {
      fontFamily: "Helvetica, Arial, sans-serif",
      fontSize: `calc(0.875rem * ${fontScale})`,
      fontWeight: 700,
      borderBottom: "1px solid #000000",
      paddingBottom: `calc(4px * ${spacingScale})`,
      marginTop: `calc(24px * ${spacingScale})`,
      marginBottom: `calc(8px * ${spacingScale})`,
    },
    placeholderText: {
      fontFamily: "Helvetica, Arial, sans-serif",
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
    degree: {
      fontFamily: "Helvetica, Arial, sans-serif",
      fontSize: `calc(0.875rem * ${fontScale})`,
      fontWeight: 700,
      flex: 1,
    },
    date: {
      fontFamily: "Helvetica, Arial, sans-serif",
      fontSize: `calc(0.875rem * ${fontScale})`,
      whiteSpace: "nowrap" as const,
      flexShrink: 0,
    },
    institution: {
      fontFamily: "Helvetica, Arial, sans-serif",
      fontSize: `calc(0.875rem * ${fontScale})`,
      fontStyle: "italic",
      flex: 1,
    },
    location: {
      fontFamily: "Helvetica, Arial, sans-serif",
      fontSize: `calc(0.875rem * ${fontScale})`,
      flexShrink: 0,
    },
    achievements: {
      listStyleType: "disc" as const,
      listStylePosition: "outside" as const,
      paddingLeft: `calc(1.5em * ${spacingScale})`,
      margin: 0,
      fontFamily: "Helvetica, Arial, sans-serif",
      fontSize: `calc(0.875rem * ${fontScale})`,
      lineHeight: "1.6",
    },
    achievementItem: {
      marginBottom: `calc(2px * ${spacingScale})`,
    },
  };

  return (
    <section>
      {/* Section Header */}
      <h2 className="uppercase" style={styles.sectionTitle}>
        Education
      </h2>

      {/* Instructional text when no education */}
      {!hasEducation && (
        <p className={placeholderOpacity} style={styles.placeholderText}>
          Include your degree, school name and the year you graduated. If you don&apos;t have a degree, list coursework or training that&apos;s relevant to the job you&apos;re applying for.
        </p>
      )}

      {/* Education Items */}
      <div>
        {hasEducation ? (
          education.map((edu) => (
            <article key={edu.id} className="education-item" style={styles.article}>
              {/* Row 1: Degree (left, bold) and Dates (right, nowrap) */}
              <div style={styles.row}>
                <h3 style={styles.degree}>
                  {edu.degree} in {edu.field}
                </h3>
                <span style={styles.date}>
                  {formatDate(edu.startDate, false)} —{" "}
                  {formatDate(edu.endDate, edu.current)}
                </span>
              </div>

              {/* Row 2: Institution (left, italic) and Location (right) */}
              <div style={styles.rowLast}>
                <span style={styles.institution}>{edu.institution}</span>
                {edu.location && <span style={styles.location}>{edu.location}</span>}
              </div>

              {/* Achievements (optional) */}
              {edu.achievements && edu.achievements.length > 0 && (
                <ul style={styles.achievements}>
                  {edu.achievements.map((achievement, index) => (
                    <li key={index} style={styles.achievementItem}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))
        ) : null}

        {/* Certifications Items */}
        {hasCertifications &&
          certifications.map((cert) => (
            <article key={cert.id} className="education-item" style={styles.article}>
              {/* Row 1: Course Name (left, bold) and Date (right) */}
              <div style={styles.row}>
                <h3 style={styles.degree}>{cert.name}</h3>
                <span style={styles.date}>{cert.date}</span>
              </div>

              {/* Row 2: Issuer (left, italic) and Credential ID (right) */}
              <div style={styles.rowLast}>
                <span style={styles.institution}>{cert.issuer}</span>
                {cert.credentialId && (
                  <span style={styles.location}>ID: {cert.credentialId}</span>
                )}
              </div>
            </article>
          ))}

        {!hasEducation && !hasCertifications && (
          /* Placeholder examples */
          <div className={placeholderOpacity}>
            {/* Education 1 */}
            <article style={styles.article}>
              <div style={styles.row}>
                <h3 style={styles.degree}>Degree in Field of Study</h3>
                <span style={styles.date}>09/2017 — 07/2020</span>
              </div>
              <div style={styles.rowLast}>
                <span style={styles.institution}>Institution Name</span>
                <span style={styles.location}>City, Country</span>
              </div>
            </article>

            {/* Education 2 */}
            <article style={styles.article}>
              <div style={styles.row}>
                <h3 style={styles.degree}>Degree in Field of Study</h3>
                <span style={styles.date}>09/2015 — 07/2017</span>
              </div>
              <div style={styles.rowLast}>
                <span style={styles.institution}>Institution Name</span>
                <span style={styles.location}>City, Country</span>
              </div>
            </article>
          </div>
        )}
      </div>

      {/* Print and pagination styles */}
      <style jsx>{`
        /* Prevent breaking inside education items */
        :global(.education-item) {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        @media print {
          :global(.education-item) {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </section>
  );
}
