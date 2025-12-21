"use client";

import { useResumeStore } from "@/store/resumeStore";
import { ContactItem } from "./resume/ContactItem";
import { Section } from "./resume/Section";
import { cleanUrl, ensureProtocol, getMailtoUrl, getTelUrl } from "@/lib/urlUtils";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import { getAdaptiveHTMLStyles } from "@/lib/adaptiveScaling";

export default function TemplateClassic() {
  const resume = useResumeStore((state) => state.resume);
  const placeholderOpacity = "opacity-50";

  // Calculate adaptive styles based on content density
  const adaptiveStyles = getAdaptiveHTMLStyles(resume);

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 p-8">
      {/* A4 Container - Vertical Pagination Support */}
      <div
        className="relative text-gray-800 shadow-lg"
        style={{
          width: "210mm",
          minHeight: "297mm",
          paddingTop: adaptiveStyles.paddingTop,
          paddingRight: adaptiveStyles.paddingSide,
          paddingBottom: adaptiveStyles.paddingBottom,
          paddingLeft: adaptiveStyles.paddingSide,
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: adaptiveStyles.fontSize,
          lineHeight: adaptiveStyles.lineHeight,
          // Background: white with page separation gradient
          background: `
            repeating-linear-gradient(
              transparent,
              transparent 297mm,
              #e5e7eb 297mm,
              #e5e7eb calc(297mm + 56px)
            ),
            white
          `,
        }}
      >
        {/* Header - Always centered, no photo support */}
        <header className="text-center">
          {/* Text Content */}
          <div className="space-y-1">
            {/* Name */}
            <h1
              className="font-bold"
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: adaptiveStyles.headingSize,
                fontWeight: 700,
              }}
            >
              {resume.personalDetails.fullName || (
                <span className={placeholderOpacity}>Your Name</span>
              )}
            </h1>

            {/* City */}
            {resume.personalDetails.location && (
              <div style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#374151",
                fontSize: `calc(0.75rem * ${adaptiveStyles.fontScale})`
              }}>
                {resume.personalDetails.location}
              </div>
            )}

            {/* Email, Phone */}
            {(resume.personalDetails.email || resume.personalDetails.phone) && (
              <div style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#374151",
                fontSize: `calc(0.75rem * ${adaptiveStyles.fontScale})`
              }}>
                {[resume.personalDetails.email, resume.personalDetails.phone]
                  .filter(Boolean)
                  .join(" | ")}
              </div>
            )}

            {/* LinkedIn */}
            {resume.personalDetails.linkedin && (
              <div style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#374151",
                fontSize: `calc(0.75rem * ${adaptiveStyles.fontScale})`
              }}>
                {cleanUrl(resume.personalDetails.linkedin)}
              </div>
            )}

            {/* GitHub */}
            {resume.personalDetails.github && (
              <div style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#374151",
                fontSize: `calc(0.75rem * ${adaptiveStyles.fontScale})`
              }}>
                {cleanUrl(resume.personalDetails.github)}
              </div>
            )}

            {/* Professional Summary */}
            <div style={{ marginTop: `calc(0.5rem * ${adaptiveStyles.spacingScale})` }}>
              <h2
                className="mb-1 uppercase"
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: `calc(0.75rem * ${adaptiveStyles.fontScale})`,
                  fontWeight: 700,
                  borderBottom: "1px solid #000000",
                  paddingBottom: `calc(2px * ${adaptiveStyles.spacingScale})`,
                }}
              >
                Professional Summary
              </h2>
              <p
                className={!resume.personalDetails.summary ? placeholderOpacity : ""}
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: `calc(0.75rem * ${adaptiveStyles.fontScale})`,
                  lineHeight: "1.5",
                  marginTop: `calc(4px * ${adaptiveStyles.spacingScale})`,
                }}
              >
                {resume.personalDetails.summary ||
                  "Use this section to give recruiters a quick glimpse of your professional profile."}
              </p>
            </div>
          </div>
        </header>

        {/* Skills Section */}
        <SkillsSection
          skills={resume.skills}
          spacingScale={adaptiveStyles.spacingScale}
          fontScale={adaptiveStyles.fontScale}
        />

        {/* Experience Section */}
        <ExperienceSection
          experiences={resume.experience}
          spacingScale={adaptiveStyles.spacingScale}
          fontScale={adaptiveStyles.fontScale}
        />

        {/* Education Section */}
        <EducationSection
          education={resume.education}
          certifications={resume.certifications}
          spacingScale={adaptiveStyles.spacingScale}
          fontScale={adaptiveStyles.fontScale}
        />

        {/* Pagination and Print styles */}
        <style jsx>{`
          /* Prevent breaking inside important elements */
          :global(header),
          :global(section),
          :global(.experience-item),
          :global(.education-item),
          :global(.skill-item) {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          /* Ensure section titles stay with content */
          :global(h2) {
            break-after: avoid;
            page-break-after: avoid;
          }

          @media print {
            /* Reset container for print */
            div[style*="210mm"] {
              box-shadow: none;
              margin: 0;
              background: white !important; /* Remove visual page breaks in print */
            }

            /* Set text color to pure black for print */
            :global(body) {
              color: #000000;
              margin: 0;
            }

            /* Ensure proper font rendering in print */
            h1,
            h2,
            p {
              color: #000000;
            }

            /* Page break management for print */
            h2 {
              break-after: avoid;
              page-break-after: avoid;
            }

            /* Prevent breaking inside items */
            :global(.experience-item),
            :global(.education-item),
            :global(.skill-item) {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            /* Link styles for print */
            a {
              color: #000000;
              text-decoration: none;
            }

            /* Hide placeholders in print */
            .opacity-50 {
              display: none;
            }

            /* Ensure proper page sizing */
            @page {
              size: A4;
              margin: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
