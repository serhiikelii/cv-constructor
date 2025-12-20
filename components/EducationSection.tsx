import { Education, Certification } from "@/types";

interface EducationSectionProps {
  education: Education[];
  certifications?: Certification[];
}

export default function EducationSection({ education, certifications = [] }: EducationSectionProps) {
  const placeholderOpacity = "opacity-50";
  const hasEducation = education && education.length > 0;
  const hasCertifications = certifications && certifications.length > 0;

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

      {/* Instructional text when no education */}
      {!hasEducation && (
        <p
          className={placeholderOpacity}
          style={{
            fontFamily: "var(--font-open-sans)",
            fontSize: "0.875rem",
            marginTop: "8px",
            marginBottom: "12px",
          }}
        >
          Include your degree, school name and the year you graduated. If you don&apos;t have a degree, list coursework or training that&apos;s relevant to the job you&apos;re applying for.
        </p>
      )}

      {/* Education Items */}
      <div>
        {hasEducation ? (
          education.map((edu) => (
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
        ))
        ) : null}

        {/* Certifications Items */}
        {hasCertifications && certifications.map((cert) => (
          <article
            key={cert.id}
            style={{
              marginBottom: "4mm",
            }}
          >
            {/* Row 1: Course Name (left, bold) and Date (right) */}
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
                {cert.name}
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-open-sans)",
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {cert.date}
              </span>
            </div>

            {/* Row 2: Issuer (left, italic) and Credential ID (right) */}
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
                {cert.issuer}
              </span>
              {cert.credentialId && (
                <span
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    fontSize: "0.875rem",
                    flexShrink: 0,
                  }}
                >
                  ID: {cert.credentialId}
                </span>
              )}
            </div>
          </article>
        ))}

        {!hasEducation && !hasCertifications && (
          /* Placeholder examples */
          <div className={placeholderOpacity}>
            {/* Education 1 */}
            <article style={{ marginBottom: "4mm" }}>
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
                  Degree in Field of Study
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    fontSize: "0.875rem",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  09/2017 — 07/2020
                </span>
              </div>
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
                  Institution Name
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    fontSize: "0.875rem",
                    flexShrink: 0,
                  }}
                >
                  City, Country
                </span>
              </div>
            </article>

            {/* Education 2 */}
            <article style={{ marginBottom: "4mm" }}>
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
                  Degree in Field of Study
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    fontSize: "0.875rem",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  09/2015 — 07/2017
                </span>
              </div>
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
                  Institution Name
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    fontSize: "0.875rem",
                    flexShrink: 0,
                  }}
                >
                  City, Country
                </span>
              </div>
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
