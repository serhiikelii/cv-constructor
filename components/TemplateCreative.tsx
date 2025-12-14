"use client";

import { useResumeStore } from "@/store/resumeStore";

export default function TemplateCreative() {
  const resume = useResumeStore((state) => state.resume);

  const accentColor = "#000000";
  const nameColor = "#6B7280"; // Gray color for name
  const textColor = "#374151";
  const sidebarBg = "#bfd3f3"; // Light blue sidebar color
  const placeholderOpacity = "opacity-50";

  // Get initials from full name
  const getInitials = (name: string) => {
    if (!name) return "YN";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

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
          display: "flex",
        }}
      >
        {/* Left Sidebar - Gray */}
        <div
          style={{
            width: "115px",
            backgroundColor: sidebarBg,
            flexShrink: 0,
          }}
        />

        {/* Main Content Area */}
        <div className="flex-1 relative">
          {/* Header with Initials Square */}
          <header className="px-12 pt-12 pb-6">
            <div className="flex items-start gap-4 mb-4">
              {/* Initials Square */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  border: `2px solid ${accentColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    color: accentColor,
                    letterSpacing: "0.05em",
                  }}
                >
                  {getInitials(resume.personalDetails.fullName)}
                </span>
              </div>

              {/* Name */}
              <div className="flex-1 pt-2">
                <div>
                  <h1
                    className="font-bold"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: nameColor,
                      letterSpacing: "0.05em",
                      lineHeight: "1.2",
                    }}
                  >
                    {resume.personalDetails.fullName || (
                      <span className={placeholderOpacity}>YOUR NAME</span>
                    )}
                  </h1>
                  {/* Underline */}
                  <div
                    style={{
                      width: "60px",
                      height: "2px",
                      backgroundColor: nameColor,
                      marginTop: "4px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Contact Info with Location Icon */}
            <div className="mt-3">
              <div
                className={`flex items-start gap-2 text-sm ${!resume.personalDetails.email && !resume.personalDetails.location ? placeholderOpacity : ""}`}
                style={{ color: textColor, fontSize: "0.875rem" }}
              >
                {/* Location Pin SVG Icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, marginTop: "2px", color: accentColor }}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <p>
                  {resume.personalDetails.location || resume.personalDetails.email ? (
                    <>
                      {resume.personalDetails.location}
                      {resume.personalDetails.location && resume.personalDetails.email && ", "}
                      {resume.personalDetails.email}
                    </>
                  ) : (
                    "Enter your your city, country, ZIP Code and professional email address. If you work remotely, specify that here."
                  )}
                </p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="px-12 pb-12">
            {/* PROFESSIONAL SUMMARY */}
            <section className="mb-8">
              <h2
                className="mb-3 font-bold uppercase tracking-wider"
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
            <section className="mb-8">
              <h2
                className="mb-3 font-bold uppercase tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: "0.875rem",
                  fontWeight: 700,
                }}
              >
                Skills
              </h2>

              {resume.skills.skills.length > 0 ? (
                <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                  {resume.skills.skills.map((skill, index) => (
                    <div key={index} className="text-sm" style={{ color: textColor }}>
                      {skill}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={placeholderOpacity}>
                  <div className="grid grid-cols-3 gap-x-6 gap-y-2 mb-2">
                    <div className="text-sm" style={{ color: textColor }}>Skill 1</div>
                    <div className="text-sm" style={{ color: textColor }}>Skill 2</div>
                    <div className="text-sm" style={{ color: textColor }}>Skill 3</div>
                  </div>
                </div>
              )}
            </section>

            {/* WORK HISTORY */}
            <section className="mb-8">
              <h2
                className="mb-3 font-bold uppercase tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: "0.875rem",
                  fontWeight: 700,
                }}
              >
                Work History
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
                      <div className="mb-1">
                        <h3 className="font-bold text-sm" style={{ color: textColor }}>
                          {exp.company} - Job Title {exp.position}
                        </h3>
                        <p className="text-sm" style={{ color: textColor }}>
                          Time employed ({exp.startDate} - {exp.current ? "Present" : exp.endDate})
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
                    <h3 className="font-bold text-sm mb-1" style={{ color: textColor }}>
                      Company Name - Job Title 1
                    </h3>
                    <p className="text-sm mb-1" style={{ color: textColor }}>
                      Time employed (Month/year - Month/year)
                    </p>
                    <ul className="ml-4 mt-1 space-y-0.5 text-sm" style={{ color: textColor }}>
                      <li className="flex gap-2"><span>•</span><span>Responsibilities</span></li>
                      <li className="flex gap-2"><span>•</span><span>Responsibilities</span></li>
                      <li className="flex gap-2"><span>•</span><span>Responsibilities</span></li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div>
                    <h3 className="font-bold text-sm mb-1" style={{ color: textColor }}>
                      Company Name - Job Title 2
                    </h3>
                    <p className="text-sm mb-1" style={{ color: textColor }}>
                      Time employed (Month/year - Month/year)
                    </p>
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
            <section>
              <h2
                className="mb-3 font-bold uppercase tracking-wider"
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
                      <p className="text-sm" style={{ color: textColor }}>
                        {edu.institution}
                      </p>
                      <p className="text-sm" style={{ color: textColor }}>
                        City - Mention (if applicable)
                      </p>
                      <p className="text-sm font-bold" style={{ color: textColor }}>
                        Degree: {edu.degree} in {edu.field}
                      </p>
                      <p className="text-sm" style={{ color: textColor }}>
                        {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`space-y-4 ${placeholderOpacity}`}>
                  <div>
                    <p className="text-sm" style={{ color: textColor }}>
                      Institution
                    </p>
                    <p className="text-sm" style={{ color: textColor }}>
                      City - Mention (if applicable)
                    </p>
                    <p className="text-sm font-bold" style={{ color: textColor }}>
                      Degree: Field of study
                    </p>
                    <p className="text-sm" style={{ color: textColor }}>
                      09/2017 - 07/2020
                    </p>
                  </div>

                  <div>
                    <p className="text-sm" style={{ color: textColor }}>
                      Institution
                    </p>
                    <p className="text-sm" style={{ color: textColor }}>
                      City - Mention (if applicable)
                    </p>
                    <p className="text-sm font-bold" style={{ color: textColor }}>
                      Degree: Field of study
                    </p>
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
