"use client";

import { useResumeStore } from "@/store/resumeStore";
import { ContactItem } from "./resume/ContactItem";
import { cleanUrl, ensureProtocol, getMailtoUrl, getTelUrl } from "@/lib/urlUtils";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

export default function TemplateCreative() {
  const resume = useResumeStore((state) => state.resume);
  const placeholderOpacity = "opacity-50";

  // Accent color - Electric Blue
  const accentColor = "#2563EB";

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 p-8">
      {/* A4 Container */}
      <div
        className="relative bg-white text-gray-800 shadow-lg"
        style={{
          width: "210mm",
          height: "297mm",
          fontFamily: "var(--font-inter)",
          fontSize: "0.875rem", // 14px ≈ 10.5pt
          lineHeight: "1.6",
        }}
      >
        {/* Header Banner - Full Width */}
        <header
          className="px-10 py-8"
          style={{
            borderBottom: `2px solid ${accentColor}`,
          }}
        >
          <div className="flex items-start gap-6">
            {/* Text Content */}
            <div className="flex-1">
              <h1
                className="font-extrabold"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "2rem", // 32px ≈ 24pt
                  fontWeight: 800,
                  color: accentColor,
                  letterSpacing: "-0.02em",
                }}
              >
                {resume.personalDetails.fullName || (
                  <span className={placeholderOpacity}>Your Name</span>
                )}
              </h1>
              {resume.personalDetails.title && (
                <p
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "1.125rem", // 18px ≈ 13.5pt
                    color: "#6B7280",
                    fontWeight: 500,
                  }}
                >
                  {resume.personalDetails.title}
                </p>
              )}

              {/* PROFILE/SUMMARY */}
              <p
                className={`mt-4 text-sm ${!resume.personalDetails.summary ? placeholderOpacity : ""}`}
                style={{
                  color: "#374151",
                  lineHeight: "1.6",
                }}
              >
                {resume.personalDetails.summary ||
                  "Use this section to give recruiters a quick glimpse of your professional profile. In just 3-4 lines, highlight your background, education and main skills."}
              </p>
            </div>

            {/* Photo - Circular */}
            {resume.personalDetails.photo && (
              <div
                className="overflow-hidden rounded-full"
                style={{
                  flexShrink: 0,
                  width: "100px",
                  height: "100px",
                  border: `3px solid ${accentColor}`,
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
          </div>
        </header>

        {/* Two Column Flex Layout */}
        <div
          style={{
            display: "flex",
            height: "calc(297mm - 200px)",
          }}
        >
          {/* LEFT SIDEBAR - 35% */}
          <div
            className="px-6 py-6"
            style={{
              width: "35%",
              flexShrink: 0,
              backgroundColor: "#F3F4F6",
            }}
          >
            {/* CONTACTS Section */}
            <section className="mb-6">
              <h2
                className="mb-2 text-xs font-bold uppercase tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: "0.75rem",
                }}
              >
                Contacts
              </h2>
              <div
                style={{
                  width: "40px",
                  height: "3px",
                  backgroundColor: accentColor,
                  marginBottom: "12px",
                }}
              />
              <div className="space-y-2 text-sm">
                {resume.personalDetails.email && (
                  <div className="flex items-start gap-2">
                    <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: accentColor }} />
                    <a
                      href={getMailtoUrl(resume.personalDetails.email)}
                      className="break-all hover:underline"
                      style={{ color: "#374151" }}
                    >
                      {resume.personalDetails.email}
                    </a>
                  </div>
                )}
                {resume.personalDetails.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: accentColor }} />
                    <a
                      href={getTelUrl(resume.personalDetails.phone)}
                      className="hover:underline"
                      style={{ color: "#374151" }}
                    >
                      {resume.personalDetails.phone}
                    </a>
                  </div>
                )}
                {resume.personalDetails.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: accentColor }} />
                    <span style={{ color: "#374151" }}>{resume.personalDetails.location}</span>
                  </div>
                )}
                {resume.personalDetails.linkedin && (
                  <div className="flex items-start gap-2">
                    <Linkedin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: accentColor }} />
                    <a
                      href={ensureProtocol(resume.personalDetails.linkedin)}
                      className="break-all hover:underline"
                      style={{ color: "#374151" }}
                    >
                      {cleanUrl(resume.personalDetails.linkedin)}
                    </a>
                  </div>
                )}
                {resume.personalDetails.github && (
                  <div className="flex items-start gap-2">
                    <Github className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: accentColor }} />
                    <a
                      href={ensureProtocol(resume.personalDetails.github)}
                      className="break-all hover:underline"
                      style={{ color: "#374151" }}
                    >
                      {cleanUrl(resume.personalDetails.github)}
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* SKILLS Section */}
            <section className="mb-4">
                <h2
                  className="mb-2 text-xs font-bold uppercase tracking-wider"
                  style={{
                    color: accentColor,
                    fontSize: "0.75rem",
                  }}
                >
                  Skills
                </h2>
                <div
                  style={{
                    width: "40px",
                    height: "3px",
                    backgroundColor: accentColor,
                    marginBottom: "12px",
                  }}
                />

                {resume.skills.skills.length === 0 && (
                  <p className={`text-sm mb-2 ${placeholderOpacity}`} style={{ color: "#374151" }}>
                    List your professional skills
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {resume.skills.skills.length > 0 ? (
                    resume.skills.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded px-2 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: "#E0E7FF",
                        color: accentColor,
                        border: `1px solid ${accentColor}30`,
                      }}
                    >
                      {skill}
                    </span>
                    ))
                  ) : (
                    <div className={placeholderOpacity}>
                      <span
                        className="rounded px-2 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: "#E0E7FF",
                          color: accentColor,
                          border: `1px solid ${accentColor}30`,
                        }}
                      >
                        Skill 1
                      </span>
                      <span
                        className="rounded px-2 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: "#E0E7FF",
                          color: accentColor,
                          border: `1px solid ${accentColor}30`,
                        }}
                      >
                        Skill 2
                      </span>
                      <span
                        className="rounded px-2 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: "#E0E7FF",
                          color: accentColor,
                          border: `1px solid ${accentColor}30`,
                        }}
                      >
                        Skill 3
                      </span>
                    </div>
                  )}
                </div>
              </section>

            {/* TOOLS Section */}
            {resume.skills.tools.length > 0 && (
              <section className="mb-4">
                <h2
                  className="mb-2 text-xs font-bold uppercase tracking-wider"
                  style={{
                    color: accentColor,
                    fontSize: "0.75rem",
                  }}
                >
                  Tools
                </h2>
                <div
                  style={{
                    width: "40px",
                    height: "3px",
                    backgroundColor: accentColor,
                    marginBottom: "12px",
                  }}
                />
                <div className="flex flex-wrap gap-2">
                  {resume.skills.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="rounded px-2 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: "#FEF3C7",
                        color: accentColor,
                        border: `1px solid ${accentColor}30`,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* LANGUAGES Section */}
            {resume.skills.languages.length > 0 && (
              <section className="mb-6">
                <h2
                  className="mb-2 text-xs font-bold uppercase tracking-wider"
                  style={{
                    color: accentColor,
                    fontSize: "0.75rem",
                  }}
                >
                  Languages
                </h2>
                <div
                  style={{
                    width: "40px",
                    height: "3px",
                    backgroundColor: accentColor,
                    marginBottom: "12px",
                  }}
                />
                <div className="space-y-1">
                  {resume.skills.languages.map((lang, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span className="text-sm" style={{ color: "#374151" }}>
                        <span className="font-semibold">{lang.language}</span>
                        <span className="text-gray-500"> — {lang.proficiency}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EDUCATION Section */}
            <section>
                <h2
                  className="mb-2 text-xs font-bold uppercase tracking-wider"
                  style={{
                    color: accentColor,
                    fontSize: "0.75rem",
                  }}
                >
                  Education
                </h2>
                <div
                  style={{
                    width: "40px",
                    height: "3px",
                    backgroundColor: accentColor,
                    marginBottom: "12px",
                  }}
                />

                {resume.education.length === 0 && (
                  <p className={`text-sm mb-2 ${placeholderOpacity}`} style={{ color: "#374151" }}>
                    Include your degree and school name
                  </p>
                )}

                <div className="space-y-4">
                  {resume.education.length > 0 ? (
                    resume.education.map((edu) => (
                    <div key={edu.id}>
                      <p className="text-sm font-semibold" style={{ color: "#374151" }}>
                        {edu.institution}
                      </p>
                      <p className="text-xs" style={{ color: "#6B7280" }}>
                        {edu.degree} in {edu.field}
                      </p>
                      <p className="text-xs" style={{ color: "#9CA3AF" }}>
                        {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                      </p>
                    </div>
                    ))
                  ) : (
                    <div className={placeholderOpacity}>
                      <p className="text-sm font-semibold" style={{ color: "#374151" }}>
                        Institution Name
                      </p>
                      <p className="text-xs" style={{ color: "#6B7280" }}>
                        Degree in Field
                      </p>
                      <p className="text-xs" style={{ color: "#9CA3AF" }}>
                        09/2017 - 07/2020
                      </p>
                    </div>
                  )}
                </div>
              </section>
          </div>

          {/* RIGHT MAIN CONTENT - 65% */}
          <div className="px-8 py-6" style={{ flex: 1 }}>
            {/* EXPERIENCE Section */}
            {(
              <section className="mb-6">
                <h2
                  className="mb-2 text-xs font-bold uppercase tracking-wider"
                  style={{
                    color: accentColor,
                    fontSize: "0.75rem",
                  }}
                >
                  Experience
                </h2>
                <div
                  style={{
                    width: "40px",
                    height: "3px",
                    backgroundColor: accentColor,
                    marginBottom: "12px",
                  }}
                />

                {resume.experience.length === 0 && (
                  <p
                    className={`text-sm mb-4 ${placeholderOpacity}`}
                    style={{ color: "#374151" }}
                  >
                    Summarize your work experience by listing each job and your responsibilities in 2-3 lines. Start with your most recent job and work backwards using the format below.
                  </p>
                )}

                <div className="space-y-5">
                  {resume.experience.length > 0 ? (
                    resume.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="mb-1 flex items-start justify-between">
                        <div>
                          <h3
                            className="font-bold"
                            style={{
                              color: accentColor,
                              fontSize: "0.9375rem",
                            }}
                          >
                            {exp.company}
                          </h3>
                          <p className="text-sm font-semibold italic" style={{ color: "#374151" }}>
                            {exp.position}
                          </p>
                        </div>
                        <p className="text-xs" style={{ color: "#9CA3AF" }}>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </p>
                      </div>
                      <ul className="ml-4 mt-2 space-y-1 text-sm" style={{ color: "#374151" }}>
                        {exp.description.map((item, index) => (
                          <li key={index} className="flex gap-2">
                            <span style={{ color: accentColor }}>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    ))
                  ) : (
                    /* Placeholder examples */
                    <div className={placeholderOpacity}>
                      {/* Job 1 placeholder */}
                      <div>
                        <div className="mb-1 flex items-start justify-between">
                          <div>
                            <h3
                              className="font-bold"
                              style={{
                                color: accentColor,
                                fontSize: "0.9375rem",
                              }}
                            >
                              Company Name
                            </h3>
                            <p className="text-sm font-semibold italic" style={{ color: "#374151" }}>
                              Job Title 1
                            </p>
                          </div>
                          <p className="text-xs" style={{ color: "#9CA3AF" }}>
                            Month/year - Month/year
                          </p>
                        </div>
                        <ul className="ml-4 mt-2 space-y-1 text-sm" style={{ color: "#374151" }}>
                          <li className="flex gap-2">
                            <span style={{ color: accentColor }}>•</span>
                            <span>Responsibilities</span>
                          </li>
                          <li className="flex gap-2">
                            <span style={{ color: accentColor }}>•</span>
                            <span>Responsibilities</span>
                          </li>
                          <li className="flex gap-2">
                            <span style={{ color: accentColor }}>•</span>
                            <span>Responsibilities</span>
                          </li>
                        </ul>
                      </div>

                      {/* Job 2 placeholder */}
                      <div>
                        <div className="mb-1 flex items-start justify-between">
                          <div>
                            <h3
                              className="font-bold"
                              style={{
                                color: accentColor,
                                fontSize: "0.9375rem",
                              }}
                            >
                              Company Name
                            </h3>
                            <p className="text-sm font-semibold italic" style={{ color: "#374151" }}>
                              Job Title 2
                            </p>
                          </div>
                          <p className="text-xs" style={{ color: "#9CA3AF" }}>
                            Month/year - Month/year
                          </p>
                        </div>
                        <ul className="ml-4 mt-2 space-y-1 text-sm" style={{ color: "#374151" }}>
                          <li className="flex gap-2">
                            <span style={{ color: accentColor }}>•</span>
                            <span>Responsibilities</span>
                          </li>
                          <li className="flex gap-2">
                            <span style={{ color: accentColor }}>•</span>
                            <span>Responsibilities</span>
                          </li>
                          <li className="flex gap-2">
                            <span style={{ color: accentColor }}>•</span>
                            <span>Responsibilities</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* PROJECTS Section */}
            {resume.projects && resume.projects.length > 0 && (
              <section>
                <h2
                  className="mb-2 text-xs font-bold uppercase tracking-wider"
                  style={{
                    color: accentColor,
                    fontSize: "0.75rem",
                  }}
                >
                  Projects
                </h2>
                <div
                  style={{
                    width: "40px",
                    height: "3px",
                    backgroundColor: accentColor,
                    marginBottom: "12px",
                  }}
                />
                <div className="space-y-4">
                  {resume.projects.map((project) => (
                    <div key={project.id}>
                      <h3 className="font-bold" style={{ color: accentColor, fontSize: "0.9375rem" }}>
                        {project.name}
                      </h3>
                      <p className="mt-1 text-sm" style={{ color: "#374151" }}>
                        {project.description}
                      </p>
                      {project.technologies.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="rounded px-2 py-0.5 text-xs"
                              style={{
                                backgroundColor: "#F3F4F6",
                                color: "#6B7280",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Print styles */}
        <style jsx>{`
          @media print {
            div[style*="210mm"] {
              box-shadow: none;
              margin: 0;
              page-break-inside: avoid;
            }

            :global(body) {
              color: #000000;
              margin: 0;
            }

            h1,
            h2,
            h3,
            p {
              color: inherit;
            }

            h2 {
              break-after: avoid;
            }

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
