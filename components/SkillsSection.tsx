import { Skills } from "@/types";

interface SkillsSectionProps {
  skills: Skills;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  // Empty state check
  const hasSkills = skills.skills && skills.skills.length > 0;
  const hasTools = skills.tools && skills.tools.length > 0;
  const hasLanguages = skills.languages && skills.languages.length > 0;

  if (!hasSkills && !hasTools && !hasLanguages) {
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

      {/* Skills */}
      {hasSkills && (
        <div style={{ marginBottom: "8px" }}>
          <h3
            style={{
              fontFamily: "var(--font-merriweather)",
              fontSize: "0.875rem",
              fontWeight: 700,
              marginBottom: "2px",
            }}
          >
            SKILLS
          </h3>
          <p
            style={{
              fontFamily: "var(--font-open-sans)",
              fontSize: "0.875rem",
              lineHeight: "1.6",
            }}
          >
            {skills.skills.join(" • ")}
          </p>
        </div>
      )}

      {/* Tools */}
      {hasTools && (
        <div style={{ marginBottom: "8px" }}>
          <h3
            style={{
              fontFamily: "var(--font-merriweather)",
              fontSize: "0.875rem",
              fontWeight: 700,
              marginBottom: "2px",
            }}
          >
            TOOLS
          </h3>
          <p
            style={{
              fontFamily: "var(--font-open-sans)",
              fontSize: "0.875rem",
              lineHeight: "1.6",
            }}
          >
            {skills.tools.join(" • ")}
          </p>
        </div>
      )}

      {/* Languages */}
      {hasLanguages && (
        <div>
          <h3
            style={{
              fontFamily: "var(--font-merriweather)",
              fontSize: "0.875rem",
              fontWeight: 700,
              marginBottom: "2px",
            }}
          >
            LANGUAGES
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
              .join(" • ")}
          </p>
        </div>
      )}
    </section>
  );
}
