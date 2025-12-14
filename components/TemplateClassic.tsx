"use client";

import { useResumeStore } from "@/store/resumeStore";
import { ContactItem } from "./resume/ContactItem";
import { Section } from "./resume/Section";
import { cleanUrl, ensureProtocol, getMailtoUrl, getTelUrl } from "@/lib/urlUtils";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";

export default function TemplateClassic() {
  const resume = useResumeStore((state) => state.resume);
  const placeholderOpacity = "opacity-50";

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 p-8">
      {/* A4 Container */}
      <div
        className="relative bg-white text-gray-800 shadow-lg"
        style={{
          width: "210mm",
          height: "297mm",
          paddingTop: "15mm",
          paddingRight: "25mm",
          paddingBottom: "25mm",
          paddingLeft: "25mm",
          fontFamily: "var(--font-merriweather)",
          fontSize: "0.875rem", // 14px ≈ 10.5pt
          lineHeight: "1.6",
        }}
      >
        {/* Header - Profile with Photo */}
        <header
          className={resume.personalDetails.photo ? "flex" : "text-center"}
          style={resume.personalDetails.photo ? { gap: "1.5rem" } : {}}
        >
          {/* Text Content Block */}
          <div className="flex-1 space-y-1" style={{ fontSize: "0.75rem" }}>
            {/* Name */}
            <h1
              className="font-bold"
              style={{
                fontFamily: "var(--font-merriweather)",
                fontSize: "1.75rem",
                fontWeight: 700,
              }}
            >
              {resume.personalDetails.fullName || (
                <span className={placeholderOpacity}>Your Name</span>
              )}
            </h1>

            {/* City */}
            {resume.personalDetails.location && (
              <div style={{ fontFamily: "var(--font-open-sans)", color: "#374151" }}>
                {resume.personalDetails.location}
              </div>
            )}

            {/* Email, Phone */}
            {(resume.personalDetails.email || resume.personalDetails.phone) && (
              <div style={{ fontFamily: "var(--font-open-sans)", color: "#374151" }}>
                {[resume.personalDetails.email, resume.personalDetails.phone]
                  .filter(Boolean)
                  .join(" | ")}
              </div>
            )}

            {/* LinkedIn */}
            {resume.personalDetails.linkedin && (
              <div style={{ fontFamily: "var(--font-open-sans)", color: "#374151" }}>
                {cleanUrl(resume.personalDetails.linkedin)}
              </div>
            )}

            {/* GitHub */}
            {resume.personalDetails.github && (
              <div style={{ fontFamily: "var(--font-open-sans)", color: "#374151" }}>
                {cleanUrl(resume.personalDetails.github)}
              </div>
            )}

            {/* Professional Summary */}
            <div className="mt-2">
              <h2
                className="mb-1 uppercase"
                style={{
                  fontFamily: "var(--font-merriweather)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  borderBottom: "1px solid #000000",
                  paddingBottom: "2px",
                }}
              >
                Professional Summary
              </h2>
              <p
                className={!resume.personalDetails.summary ? placeholderOpacity : ""}
                style={{
                  fontFamily: "var(--font-open-sans)",
                  fontSize: "0.75rem",
                  lineHeight: "1.5",
                  marginTop: "4px",
                }}
              >
                {resume.personalDetails.summary ||
                  "Use this section to give recruiters a quick glimpse of your professional profile."}
              </p>
            </div>
          </div>

          {/* Photo Block - Only if photo exists */}
          {resume.personalDetails.photo && (
            <div
              style={{
                flexShrink: 0,
                width: "3.5cm", // 35mm
                height: "4.5cm", // 45mm
                overflow: "hidden",
              }}
            >
              <img
                src={resume.personalDetails.photo}
                alt={resume.personalDetails.fullName || "Profile photo"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </header>

        {/* Skills Section */}
        <SkillsSection skills={resume.skills} />

        {/* Experience Section */}
        <ExperienceSection experiences={resume.experience} />

        {/* Education Section */}
        <EducationSection education={resume.education} />

        {/* Print styles */}
        <style jsx>{`
          @media print {
            /* Reset container margins for print */
            div[style*="210mm"] {
              box-shadow: none;
              margin: 0;
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

            /* Page break management */
            h2 {
              break-after: avoid;
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
          }
        `}</style>
      </div>
    </div>
  );
}
