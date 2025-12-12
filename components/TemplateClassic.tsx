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

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 p-8">
      {/* A4 Container */}
      <div
        className="relative bg-white text-gray-800 shadow-lg"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "25mm",
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
          <div
            className={resume.personalDetails.photo ? "flex-1" : ""}
            style={
              resume.personalDetails.photo
                ? { display: "flex", flexDirection: "column" }
                : {}
            }
          >
            {/* Name and Title */}
            <div>
              <h1
                className="font-bold"
                style={{
                  fontFamily: "var(--font-merriweather)",
                  fontSize: "1.75rem", // 28px ≈ 21pt
                  fontWeight: 700,
                }}
              >
                {resume.personalDetails.fullName || "Your Name"}
              </h1>
              {resume.personalDetails.title && (
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--font-open-sans)",
                    fontSize: "1rem", // 16px ≈ 12pt
                    color: "#6B7280", // gray-500 for screen
                  }}
                >
                  {resume.personalDetails.title}
                </p>
              )}
            </div>

            {/* Contact Information */}
            <div
              className="mt-4"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: resume.personalDetails.photo
                  ? "flex-start"
                  : "center",
                alignItems: "center",
                gap: "0.5rem 1rem",
                fontFamily: "var(--font-open-sans)",
                fontSize: "0.875rem",
                color: "#374151",
              }}
            >
              <ContactItem
                icon={<Mail className="w-3 h-3" />}
                value={resume.personalDetails.email}
                href={getMailtoUrl(resume.personalDetails.email)}
              />
              <ContactItem
                icon={<Phone className="w-3 h-3" />}
                value={resume.personalDetails.phone}
                href={getTelUrl(resume.personalDetails.phone)}
              />
              <ContactItem
                icon={<MapPin className="w-3 h-3" />}
                value={resume.personalDetails.location || ""}
              />
              <ContactItem
                icon={<Linkedin className="w-3 h-3" />}
                value={cleanUrl(resume.personalDetails.linkedin || "")}
                href={ensureProtocol(resume.personalDetails.linkedin || "")}
              />
              <ContactItem
                icon={<Github className="w-3 h-3" />}
                value={cleanUrl(resume.personalDetails.github || "")}
                href={ensureProtocol(resume.personalDetails.github || "")}
              />
              <ContactItem
                icon={<Globe className="w-3 h-3" />}
                value={cleanUrl(resume.personalDetails.website || "")}
                href={ensureProtocol(resume.personalDetails.website || "")}
              />
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

        {/* Summary Section - Only if summary exists */}
        {resume.personalDetails.summary && (
          <section>
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
              Summary
            </h2>
            <p
              style={{
                fontFamily: "var(--font-open-sans)",
                fontSize: "0.875rem",
                lineHeight: "1.6",
                marginTop: "4px",
              }}
            >
              {resume.personalDetails.summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        <ExperienceSection experiences={resume.experience} />

        {/* Education Section */}
        <EducationSection education={resume.education} />

        {/* Skills Section */}
        <SkillsSection skills={resume.skills} />

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
          }
        `}</style>
      </div>
    </div>
  );
}
