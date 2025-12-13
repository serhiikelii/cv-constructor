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
          minHeight: "297mm",
          fontFamily: "var(--font-inter)",
          fontSize: "0.875rem",
          lineHeight: "1.6",
        }}
      >
        {/* Header */}
        <header className="px-16 pt-12 pb-6">
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

          {/* Contact Info Placeholder */}
          <p
            className={`mt-3 text-sm ${!resume.personalDetails.email && !resume.personalDetails.location ? placeholderOpacity : ""}`}
            style={{ color: textColor, fontSize: "0.875rem" }}
          >
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

              <p
                className={`mb-3 text-sm ${resume.skills.skills.length === 0 ? placeholderOpacity : ""}`}
                style={{ color: textColor }}
              >
                {resume.skills.skills.length > 0
                  ? ""
                  : "List your professional skills in bullet points so they're easy for recruiters to read."}
              </p>

              {resume.skills.skills.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                  {resume.skills.skills.map((skill, index) => (
                    <div key={index} className="text-sm" style={{ color: textColor }}>
                      {skill}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`grid grid-cols-2 gap-x-8 gap-y-1 ${placeholderOpacity}`}>
                  <div className="text-sm" style={{ color: textColor }}>Skill 1</div>
                  <div className="text-sm" style={{ color: textColor }}>Skill 2</div>
                  <div className="text-sm" style={{ color: textColor }}>Skill 3</div>
                  <div className="text-sm" style={{ color: textColor }}>Skill 4</div>
                </div>
              )}
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
                            {edu.institution} - {edu.location || "City"} - Mention (if applicable)
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
                        Institution - City - Mention (if applicable)
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
                        Institution - City - Mention (if applicable)
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
