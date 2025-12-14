"use client";

import { useResumeStore } from "@/store/resumeStore";

export default function TemplateMinimal() {
  const resume = useResumeStore((state) => state.resume);

  // Accent color - Dark Navy Blue
  const accentColor = "#1e3a5f";
  const textColor = "#374151";
  const placeholderOpacity = "opacity-50";

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 p-8">
      {/* A4 Container */}
      <div
        className="relative bg-white text-gray-800 shadow-lg"
        style={{
          width: "210mm",
          height: "297mm",
          fontFamily: "var(--font-inter)",
          fontSize: "0.875rem",
          lineHeight: "1.6",
        }}
      >
        {/* Header */}
        <header className="px-16 pt-12 pb-6">
          <div className="flex items-start gap-6">
            {/* Text Content */}
            <div className="flex-1">
              <h1
                className="font-bold"
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: accentColor,
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                }}
              >
                {resume.personalDetails.fullName || (
                  <span className={placeholderOpacity}>YOUR NAME</span>
                )}
              </h1>

              {/* Contact Info */}
              <div
                className={`mt-3 flex flex-col gap-1 text-sm ${
                  !resume.personalDetails.email &&
                  !resume.personalDetails.location &&
                  !resume.personalDetails.phone &&
                  !resume.personalDetails.linkedin
                    ? placeholderOpacity
                    : ""
                }`}
                style={{ color: textColor, fontSize: "0.875rem" }}
              >
                {resume.personalDetails.location ||
                 resume.personalDetails.email ||
                 resume.personalDetails.phone ||
                 resume.personalDetails.linkedin ? (
                  <>
                    {/* Line 1: City */}
                    {resume.personalDetails.location && (
                      <div>{resume.personalDetails.location}</div>
                    )}

                    {/* Line 2: Email | Phone */}
                    {(resume.personalDetails.email || resume.personalDetails.phone) && (
                      <div className="flex items-center gap-2">
                        {[
                          resume.personalDetails.email,
                          resume.personalDetails.phone,
                        ]
                          .filter(Boolean)
                          .map((item, index, arr) => (
                            <span key={index}>
                              {item}
                              {index < arr.length - 1 && (
                                <span className="mx-2" style={{ color: textColor }}>|</span>
                              )}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* Line 3: LinkedIn */}
                    {resume.personalDetails.linkedin && (
                      <div>{resume.personalDetails.linkedin}</div>
                    )}

                    {/* Line 4: GitHub */}
                    {resume.personalDetails.github && (
                      <div>{resume.personalDetails.github}</div>
                    )}
                  </>
                ) : (
                  <>
                    <div>City, Country</div>
                    <div className="flex items-center gap-2">
                      <span>email@example.com</span>
                      <span className="mx-2">|</span>
                      <span>+1 234 567 890</span>
                    </div>
                    <div>LinkedIn</div>
                    <div>GitHub</div>
                  </>
                )}
              </div>
            </div>

            {/* Photo - Circular */}
            {resume.personalDetails.photo ? (
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
            ) : (
              <div
                className={`flex items-center justify-center overflow-hidden rounded-full bg-gray-100 ${placeholderOpacity}`}
                style={{
                  flexShrink: 0,
                  width: "100px",
                  height: "100px",
                  border: `3px solid ${accentColor}`,
                }}
              >
                <span className="text-xs text-gray-400">Photo</span>
              </div>
            )}
          </div>
        </header>

        {/* Main Content with Timeline */}
        <div className="px-16 pb-12">
          {/* Timeline Container */}
          <div className="relative" style={{ paddingLeft: "40px" }}>
            {/* Vertical Timeline Line */}
            <div
              style={{
                position: "absolute",
                left: "14px",
                top: "7px",
                bottom: "0",
                width: "4px",
                backgroundColor: accentColor,
              }}
            />

            {/* PROFESSIONAL SUMMARY */}
            <section className="relative mb-8">
              {/* Timeline Circle */}
              <div
                style={{
                  position: "absolute",
                  left: "-32px",
                  top: "0px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  border: `3px solid ${accentColor}`,
                }}
              />

              <h2
                className="mb-2 font-bold uppercase tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: "0.875rem",
                  fontWeight: 700,
                }}
              >
                Professional Summary
              </h2>

              <p
                className={`text-sm ${!resume.personalDetails.summary ? placeholderOpacity : ""}`}
                style={{ color: textColor, lineHeight: "1.6" }}
              >
                {resume.personalDetails.summary ||
                  "Use this section to give recruiters a quick glimpse of your professional profile. In just 3-4 lines, highlight your background, education and main skills."}
              </p>
            </section>

            {/* SKILLS */}
            <section className="relative mb-8">
              {/* Timeline Circle */}
              <div
                style={{
                  position: "absolute",
                  left: "-32px",
                  top: "0px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  border: `3px solid ${accentColor}`,
                }}
              />

              <p
                className={`mb-3 text-sm ${resume.skills.skills.length === 0 && resume.skills.tools.length === 0 && resume.skills.languages.length === 0 ? placeholderOpacity : ""}`}
                style={{ color: textColor }}
              >
                {resume.skills.skills.length === 0 && resume.skills.tools.length === 0 && resume.skills.languages.length === 0
                  ? "List your professional skills, tools and languages in bullet points so they're easy for recruiters to read."
                  : ""}
              </p>

              {/* Three column layout */}
              <div className="grid grid-cols-3 gap-x-6">
                {/* SKILLS Column */}
                <div>
                  <h2
                    className="mb-2 font-bold uppercase tracking-wider"
                    style={{
                      color: accentColor,
                      fontSize: "0.875rem",
                      fontWeight: 700,
                    }}
                  >
                    Skills
                  </h2>
                  {resume.skills.skills.length > 0 ? (
                    <div className="space-y-1">
                      {resume.skills.skills.map((skill, index) => (
                        <div key={index} className="flex gap-2 text-sm" style={{ color: textColor }}>
                          <span>•</span>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`space-y-1 ${placeholderOpacity}`}>
                      <div className="flex gap-2 text-sm" style={{ color: textColor }}>
                        <span>•</span>
                        <span>Skill 1</span>
                      </div>
                      <div className="flex gap-2 text-sm" style={{ color: textColor }}>
                        <span>•</span>
                        <span>Skill 2</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* TOOLS Column */}
                <div>
                  <h2
                    className="mb-2 font-bold uppercase tracking-wider"
                    style={{
                      color: accentColor,
                      fontSize: "0.875rem",
                      fontWeight: 700,
                    }}
                  >
                    Tools
                  </h2>
                  {resume.skills.tools.length > 0 ? (
                    <div className="space-y-1">
                      {resume.skills.tools.map((tool, index) => (
                        <div key={index} className="flex gap-2 text-sm" style={{ color: textColor }}>
                          <span>•</span>
                          <span>{tool}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`space-y-1 ${placeholderOpacity}`}>
                      <div className="flex gap-2 text-sm" style={{ color: textColor }}>
                        <span>•</span>
                        <span>Tool 1</span>
                      </div>
                      <div className="flex gap-2 text-sm" style={{ color: textColor }}>
                        <span>•</span>
                        <span>Tool 2</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* LANGUAGES Column */}
                <div>
                  <h2
                    className="mb-2 font-bold uppercase tracking-wider"
                    style={{
                      color: accentColor,
                      fontSize: "0.875rem",
                      fontWeight: 700,
                    }}
                  >
                    Languages
                  </h2>
                  {resume.skills.languages.length > 0 ? (
                    <div className="space-y-1">
                      {resume.skills.languages.map((lang, index) => (
                        <div key={index} className="flex gap-2 text-sm" style={{ color: textColor }}>
                          <span>•</span>
                          <span>{lang.language} ({lang.proficiency})</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`space-y-1 ${placeholderOpacity}`}>
                      <div className="flex gap-2 text-sm" style={{ color: textColor }}>
                        <span>•</span>
                        <span>Language 1 (Level)</span>
                      </div>
                      <div className="flex gap-2 text-sm" style={{ color: textColor }}>
                        <span>•</span>
                        <span>Language 2 (Level)</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* PROFESSIONAL EXPERIENCE */}
            <section className="relative mb-8">
              {/* Timeline Circle */}
              <div
                style={{
                  position: "absolute",
                  left: "-32px",
                  top: "0px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  border: `3px solid ${accentColor}`,
                }}
              />

              <h2
                className="mb-2 font-bold uppercase tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: "0.875rem",
                  fontWeight: 700,
                }}
              >
                Professional Experience
              </h2>

              <p
                className={`mb-4 text-sm ${resume.experience.length === 0 ? placeholderOpacity : ""}`}
                style={{ color: textColor }}
              >
                {resume.experience.length > 0
                  ? ""
                  : "Summarize your work experience by listing each job and your responsibilities in 2-3 lines. Start with your most recent job and work backwards using the format below."}
              </p>

              {resume.experience.length > 0 ? (
                <div className="space-y-5">
                  {resume.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="mb-1 flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-sm" style={{ color: textColor }}>
                            {exp.position} | {exp.company}
                          </h3>
                        </div>
                        <p className="text-sm" style={{ color: textColor }}>
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </p>
                      </div>
                      <ul className="ml-4 mt-2 space-y-1 text-sm" style={{ color: textColor }}>
                        {exp.description.map((item, index) => (
                          <li key={index} className="flex gap-2">
                            <span>•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`space-y-5 ${placeholderOpacity}`}>
                  {/* Job 1 */}
                  <div>
                    <div className="mb-1 flex items-start justify-between">
                      <h3 className="font-bold text-sm" style={{ color: textColor }}>
                        Job Title 1 | Company Name
                      </h3>
                      <p className="text-sm" style={{ color: textColor }}>
                        Time employed (Month/year - Month/year)
                      </p>
                    </div>
                    <ul className="ml-4 mt-1 space-y-0.5 text-sm" style={{ color: textColor }}>
                      <li className="flex gap-2"><span>•</span><span>Responsibilities</span></li>
                      <li className="flex gap-2"><span>•</span><span>Responsibilities</span></li>
                      <li className="flex gap-2"><span>•</span><span>Responsibilities</span></li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div>
                    <div className="mb-1 flex items-start justify-between">
                      <h3 className="font-bold text-sm" style={{ color: textColor }}>
                        Job Title 2 | Company Name
                      </h3>
                      <p className="text-sm" style={{ color: textColor }}>
                        Time employed (Month/year - Month/year)
                      </p>
                    </div>
                    <ul className="ml-4 mt-1 space-y-0.5 text-sm" style={{ color: textColor }}>
                      <li className="flex gap-2"><span>•</span><span>Responsibilities</span></li>
                      <li className="flex gap-2"><span>•</span><span>Responsibilities</span></li>
                      <li className="flex gap-2"><span>•</span><span>Responsibilities</span></li>
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* EDUCATION */}
            <section className="relative">
              {/* Timeline Circle */}
              <div
                style={{
                  position: "absolute",
                  left: "-32px",
                  top: "0px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  border: `3px solid ${accentColor}`,
                }}
              />

              <h2
                className="mb-2 font-bold uppercase tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: "0.875rem",
                  fontWeight: 700,
                }}
              >
                Education
              </h2>

              <p
                className={`mb-4 text-sm ${resume.education.length === 0 ? placeholderOpacity : ""}`}
                style={{ color: textColor }}
              >
                {resume.education.length > 0
                  ? ""
                  : "Include your degree, school name and the year you graduated. If you don't have a degree, list counerwork or training that's relevant to the job you're applying for"}
              </p>

              {resume.education.length > 0 ? (
                <div className="space-y-4">
                  {resume.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium" style={{ color: textColor }}>
                            {edu.institution}
                          </p>
                          <p className="text-sm font-bold" style={{ color: textColor }}>
                            Degree: {edu.degree} in {edu.field}
                          </p>
                        </div>
                        <p className="text-sm" style={{ color: textColor }}>
                          {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`space-y-3 ${placeholderOpacity}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm" style={{ color: textColor }}>
                        Institution
                      </p>
                      <p className="text-sm font-bold" style={{ color: textColor }}>
                        Degree: Field of study
                      </p>
                    </div>
                    <p className="text-sm" style={{ color: textColor }}>
                      09/2017 - 07/2020
                    </p>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm" style={{ color: textColor }}>
                        Institution
                      </p>
                      <p className="text-sm font-bold" style={{ color: textColor }}>
                        Degree: Field of study
                      </p>
                    </div>
                    <p className="text-sm" style={{ color: textColor }}>
                      09/2015 - 07/2017
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Print styles */}
        <style jsx>{`
          @media print {
            div[style*="210mm"] {
              box-shadow: none;
              margin: 0;
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
