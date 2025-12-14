"use client";

import { useResumeStore } from "@/store/resumeStore";
import { cleanUrl, ensureProtocol, getMailtoUrl, getTelUrl } from "@/lib/urlUtils";

export default function TemplateModern() {
  const resume = useResumeStore((state) => state.resume);
  const placeholderOpacity = "opacity-50";

  // Accent color - Professional Navy
  const accentColor = "#1e3a5f";
  const textColor = "#374151";

  // Function to get initials from fullName
  const getInitials = (fullName: string) => {
    if (!fullName) return "YN";
    const parts = fullName.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
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
        }}
      >
        {/* Decorative Left Stripe */}
        <div
          className="absolute left-6 top-0 bottom-0 h-full"
          style={{
            width: "12px",
            backgroundColor: "#DBEAFE",
          }}
        />

        {/* Main Content with left padding */}
        <div className="pl-14 pr-10 pt-10">
          {/* Header Block (Gray Background) */}
          <header
            className="-mr-10 -ml-4 mb-8 p-8"
            style={{
              backgroundColor: "#F1F5F9",
            }}
          >
            {/* Name and Initials Block */}
            <div className="flex items-center gap-6 mb-6">
              {/* Initials Square */}
              <div
                className="flex items-center justify-center bg-white"
                style={{
                  width: "96px",
                  height: "96px",
                  border: `4px solid ${accentColor}`,
                  fontSize: "2.25rem",
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                  color: accentColor,
                }}
              >
                {resume.personalDetails.fullName ? (
                  getInitials(resume.personalDetails.fullName)
                ) : (
                  <span className={placeholderOpacity}>YN</span>
                )}
              </div>

              {/* Name */}
              <div className="flex-1">
                <h1
                  className="font-bold uppercase tracking-widest mb-2"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "2.25rem",
                    fontWeight: 700,
                    color: "#475569",
                    letterSpacing: "0.15em",
                  }}
                >
                  {resume.personalDetails.fullName || (
                    <span className={placeholderOpacity}>YOUR NAME</span>
                  )}
                </h1>
                {/* Line under name */}
                <div
                  style={{
                    width: "64px",
                    height: "4px",
                    backgroundColor: "#64748B",
                  }}
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-sm mb-6 pl-1" style={{ marginLeft: "96px", color: "#64748B" }}>
              {resume.personalDetails.location ||
              resume.personalDetails.email ||
              resume.personalDetails.phone ||
              resume.personalDetails.linkedin ? (
                <div className="max-w-md space-y-1">
                  {resume.personalDetails.location && <p>{resume.personalDetails.location}</p>}
                  <p>
                    {resume.personalDetails.email}
                    {resume.personalDetails.email && resume.personalDetails.phone && " | "}
                    {resume.personalDetails.phone}
                  </p>
                  {resume.personalDetails.linkedin && (
                    <p>{cleanUrl(resume.personalDetails.linkedin)}</p>
                  )}
                </div>
              ) : (
                <p className={`max-w-md ${placeholderOpacity}`}>
                  City, Country
                  <br />
                  email@example.com | +1 234 567 890
                  <br />
                  linkedin.com/in/yourprofile
                </p>
              )}
            </div>

            {/* Professional Summary */}
            <div className="ml-1">
              <h2
                className="font-bold uppercase tracking-widest mb-2"
                style={{
                  fontSize: "1rem",
                  color: accentColor,
                  letterSpacing: "0.15em",
                }}
              >
                Professional Summary
              </h2>
              <p
                className={`text-sm leading-relaxed text-justify ${!resume.personalDetails.summary ? placeholderOpacity : ""}`}
                style={{ color: textColor }}
              >
                {resume.personalDetails.summary ||
                  "Use this section to give recruiters a quick glimpse of your professional profile. In just 3-4 lines, highlight your background, education and main skills."}
              </p>
            </div>
          </header>

          {/* Main Body (White Background) */}
          <main className="space-y-8">
            {/* Skills (3 column grid) */}
            <section>
              <h2
                className="font-bold uppercase tracking-widest mb-4"
                style={{
                  fontSize: "1rem",
                  color: accentColor,
                  letterSpacing: "0.15em",
                }}
              >
                Skills
              </h2>

              {resume.skills.skills.length === 0 && (
                <p className={`text-sm mb-3 ${placeholderOpacity}`} style={{ color: textColor }}>
                  List your professional skills in a clear, organized manner
                </p>
              )}

              {resume.skills.skills.length > 0 ? (
                <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm font-medium" style={{ color: textColor }}>
                  {resume.skills.skills.map((skill, index) => (
                    <div key={index}>{skill}</div>
                  ))}
                </div>
              ) : (
                <div className={`grid grid-cols-3 gap-x-4 gap-y-2 text-sm font-medium ${placeholderOpacity}`} style={{ color: textColor }}>
                  <div>Skill 1</div>
                  <div>Skill 2</div>
                  <div>Skill 3</div>
                  <div>Skill 4</div>
                  <div>Skill 5</div>
                  <div>Skill 6</div>
                </div>
              )}
            </section>

            {/* Work History */}
            <section>
              <h2
                className="font-bold uppercase tracking-widest mb-4"
                style={{
                  fontSize: "1rem",
                  color: accentColor,
                  letterSpacing: "0.15em",
                }}
              >
                Work History
              </h2>

              {resume.experience.length === 0 && (
                <p className={`text-sm mb-4 ${placeholderOpacity}`} style={{ color: textColor }}>
                  Summarize your work experience by listing each job and your responsibilities in 2-3 lines. Start with your most recent job and work backwards.
                </p>
              )}

              {resume.experience.length > 0 ? (
                <div className="space-y-6">
                  {resume.experience.map((job) => (
                    <div key={job.id} className="break-inside-avoid">
                      {/* Company - Position */}
                      <div className="font-bold text-base" style={{ color: accentColor }}>
                        {job.company}{" "}
                        <span className="font-normal" style={{ color: "#64748B" }}>
                          – {job.position}
                        </span>
                      </div>

                      {/* Dates */}
                      <div className="text-xs italic uppercase mb-2" style={{ color: "#94A3B8" }}>
                        {job.startDate} - {job.current ? "Present" : job.endDate}
                      </div>

                      {/* Bullet points */}
                      <ul className="list-disc list-outside ml-5 text-sm space-y-1" style={{ color: textColor }}>
                        {job.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`space-y-6 ${placeholderOpacity}`}>
                  {/* Job 1 Placeholder */}
                  <div className="break-inside-avoid">
                    <div className="font-bold text-base" style={{ color: accentColor }}>
                      Company Name{" "}
                      <span className="font-normal" style={{ color: "#64748B" }}>
                        – Job Title 1
                      </span>
                    </div>
                    <div className="text-xs italic uppercase mb-2" style={{ color: "#94A3B8" }}>
                      Month/Year - Month/Year
                    </div>
                    <ul className="list-disc list-outside ml-5 text-sm space-y-1" style={{ color: textColor }}>
                      <li>Responsibilities</li>
                      <li>Responsibilities</li>
                      <li>Responsibilities</li>
                    </ul>
                  </div>

                  {/* Job 2 Placeholder */}
                  <div className="break-inside-avoid">
                    <div className="font-bold text-base" style={{ color: accentColor }}>
                      Company Name{" "}
                      <span className="font-normal" style={{ color: "#64748B" }}>
                        – Job Title 2
                      </span>
                    </div>
                    <div className="text-xs italic uppercase mb-2" style={{ color: "#94A3B8" }}>
                      Month/Year - Month/Year
                    </div>
                    <ul className="list-disc list-outside ml-5 text-sm space-y-1" style={{ color: textColor }}>
                      <li>Responsibilities</li>
                      <li>Responsibilities</li>
                      <li>Responsibilities</li>
                    </ul>
                  </div>
                </div>
              )}
            </section>

            {/* Education */}
            <section>
              <h2
                className="font-bold uppercase tracking-widest mb-4"
                style={{
                  fontSize: "1rem",
                  color: accentColor,
                  letterSpacing: "0.15em",
                }}
              >
                Education
              </h2>

              {resume.education.length === 0 && (
                <p className={`text-sm mb-4 ${placeholderOpacity}`} style={{ color: textColor }}>
                  Include your degree, school name and the year you graduated. If you don't have a degree, list coursework or training that's relevant.
                </p>
              )}

              {resume.education.length > 0 ? (
                <div className="space-y-4">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="break-inside-avoid">
                      <div className="font-bold text-base" style={{ color: accentColor }}>
                        {edu.institution}
                      </div>
                      <div className="text-sm" style={{ color: textColor }}>
                        {edu.location && `${edu.location} • `}
                        {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                      </div>
                      <div className="text-sm font-semibold mt-1" style={{ color: "#64748B" }}>
                        Degree: {edu.degree} in {edu.field}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`space-y-4 ${placeholderOpacity}`}>
                  <div className="break-inside-avoid">
                    <div className="font-bold text-base" style={{ color: accentColor }}>
                      Institution Name
                    </div>
                    <div className="text-sm" style={{ color: textColor }}>
                      City • 09/2017 - 07/2020
                    </div>
                    <div className="text-sm font-semibold mt-1" style={{ color: "#64748B" }}>
                      Degree: Field of Study
                    </div>
                  </div>
                </div>
              )}
            </section>
          </main>
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
