import { Skills } from "@/types";

interface SkillsSectionProps {
  skills: Skills;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  // Empty state check: hide section if no technical skills and no languages
  const hasTechnical = skills.technical && skills.technical.length > 0;
  const hasLanguages = skills.languages && skills.languages.length > 0;
  const hasSoft = skills.soft && skills.soft.length > 0;

  if (!hasTechnical && !hasLanguages && !hasSoft) {
    return null;
  }

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
        Skills
      </h2>

      {/* Technical Skills */}
      {hasTechnical && (
        <div style={{ marginBottom: "4px" }}>
          <h3
            style={{
              fontFamily: "var(--font-merriweather)",
              fontSize: "0.875rem",
              fontWeight: 700,
              marginBottom: "2px",
            }}
          >
            Technical
          </h3>
          <p
            style={{
              fontFamily: "var(--font-open-sans)",
              fontSize: "0.875rem",
              lineHeight: "1.6",
            }}
          >
            {skills.technical.join(", ")}
          </p>
        </div>
      )}

      {/* Languages */}
      {hasLanguages && (
        <div style={{ marginBottom: "4px" }}>
          <h3
            style={{
              fontFamily: "var(--font-merriweather)",
              fontSize: "0.875rem",
              fontWeight: 700,
              marginBottom: "2px",
            }}
          >
            Languages
          </h3>
          <p
            style={{
              fontFamily: "var(--font-open-sans)",
              fontSize: "0.875rem",
              lineHeight: "1.6",
            }}
          >
            {skills.languages
              .map((lang) => `${lang.language} (${lang.proficiency})`)
              .join(", ")}
          </p>
        </div>
      )}

      {/* Soft Skills (optional) */}
      {hasSoft && (
        <div>
          <h3
            style={{
              fontFamily: "var(--font-merriweather)",
              fontSize: "0.875rem",
              fontWeight: 700,
              marginBottom: "2px",
            }}
          >
            Soft Skills
          </h3>
          <p
            style={{
              fontFamily: "var(--font-open-sans)",
              fontSize: "0.875rem",
              lineHeight: "1.6",
            }}
          >
            {skills.soft!.join(", ")}
          </p>
        </div>
      )}
    </section>
  );
}
