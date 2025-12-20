import { Skills } from "@/types";

interface SkillsSectionProps {
  skills: Skills;
  spacingScale?: number;
  fontScale?: number;
}

export default function SkillsSection({
  skills,
  spacingScale = 1.0,
  fontScale = 1.0,
}: SkillsSectionProps) {
  const placeholderOpacity = "opacity-50";

  // Empty state check
  const hasSkills = skills.skills && skills.skills.length > 0;
  const hasTools = skills.tools && skills.tools.length > 0;
  const hasLanguages = skills.languages && skills.languages.length > 0;
  const hasAnySkills = hasSkills || hasTools || hasLanguages;

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
    skillText: {
      fontFamily: "var(--font-open-sans)",
      fontSize: `calc(0.875rem * ${fontScale})`,
      lineHeight: "1.6",
    },
    skillGroup: {
      marginBottom: `calc(8px * ${spacingScale})`,
    },
    subheading: {
      fontFamily: "var(--font-merriweather)",
      fontSize: `calc(0.875rem * ${fontScale})`,
      fontWeight: 700,
      marginBottom: `calc(2px * ${spacingScale})`,
    },
  };

  return (
    <section>
      {/* Section Header */}
      <h2 className="uppercase" style={styles.sectionTitle}>
        Skills
      </h2>

      {/* Instructional text when no skills */}
      {!hasAnySkills && (
        <p className={placeholderOpacity} style={styles.placeholderText}>
          List your professional skills in bullet points so they&apos;re easy for recruiters to read.
        </p>
      )}

      {!hasAnySkills && (
        <div className={placeholderOpacity}>
          <p style={styles.skillText}>Skill 1 • Skill 2 • Skill 3 • Skill 4</p>
        </div>
      )}

      {/* Skills */}
      {hasSkills && (
        <div style={styles.skillGroup}>
          <p style={styles.skillText}>{skills.skills.join(" • ")}</p>
        </div>
      )}

      {/* Tools */}
      {hasTools && (
        <div style={styles.skillGroup}>
          <h3 style={styles.subheading}>TOOLS</h3>
          <p style={styles.skillText}>{skills.tools.join(" • ")}</p>
        </div>
      )}

      {/* Languages */}
      {hasLanguages && (
        <div>
          <h3 style={styles.subheading}>LANGUAGES</h3>
          <p style={styles.skillText}>
            {skills.languages
              .map((lang) => `${lang.language} (${lang.proficiency})`)
              .join(" • ")}
          </p>
        </div>
      )}
    </section>
  );
}
