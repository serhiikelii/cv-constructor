"use client";

import { useResumeStore } from "@/store/resumeStore";
import { cleanUrl, ensureProtocol } from "@/lib/urlUtils";

export default function TemplateSidebar() {
  const resume = useResumeStore((state) => state.resume);
  const placeholderOpacity = "opacity-50";

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 p-8">
      {/* A4 Container */}
      <div
        className="relative bg-white text-gray-800 shadow-lg overflow-hidden"
        style={{
          width: "210mm",
          height: "297mm",
          fontFamily: "var(--font-inter)",
          fontSize: "0.875rem",
          lineHeight: "1.6",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
        }}
      >
        {/* LEFT SIDEBAR - 4 columns (33%) */}
        <aside
          className="col-span-4 p-8 pt-12 flex flex-col gap-10 border-r border-gray-200"
          style={{
            backgroundColor: "#DBEAFE",
          }}
        >
          {/* PHOTO */}
          <div className="w-full aspect-square rounded-lg overflow-hidden mb-2 relative flex items-center justify-center"
            style={{
              backgroundColor: resume.personalDetails.photo ? "transparent" : "#E5E7EB",
            }}
          >
            {resume.personalDetails.photo ? (
              <img
                src={resume.personalDetails.photo}
                alt={resume.personalDetails.fullName || "Profile"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`flex items-center justify-center bg-white ${placeholderOpacity}`}
                style={{
                  width: "48px",
                  height: "48px",
                  border: "2px solid #1e3a5f",
                  fontSize: "1.25rem",
                  fontWeight: 300,
                  letterSpacing: "0.05em",
                  color: "#1e3a5f",
                }}
              >
                {resume.personalDetails.fullName
                  ? (() => {
                      const parts = resume.personalDetails.fullName.trim().split(" ");
                      if (parts.length >= 2) {
                        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
                      }
                      return resume.personalDetails.fullName.substring(0, 2).toUpperCase();
                    })()
                  : "YN"}
              </div>
            )}
          </div>

          {/* CONTACT SECTION */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wide border-b-2 border-gray-300 pb-2 mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-4 text-sm text-gray-700">
              {/* Address */}
              {resume.personalDetails.location ? (
                <div>
                  <span className="font-bold block text-gray-900">Address</span>
                  <span>{resume.personalDetails.location}</span>
                </div>
              ) : (
                <div className={placeholderOpacity}>
                  <span className="font-bold block text-gray-900">Address</span>
                  <span>City, Country</span>
                </div>
              )}

              {/* Phone */}
              {resume.personalDetails.phone ? (
                <div>
                  <span className="font-bold block text-gray-900">Phone</span>
                  <span>{resume.personalDetails.phone}</span>
                </div>
              ) : (
                <div className={placeholderOpacity}>
                  <span className="font-bold block text-gray-900">Phone</span>
                  <span>+1 234 567 890</span>
                </div>
              )}

              {/* Email */}
              {resume.personalDetails.email ? (
                <div>
                  <span className="font-bold block text-gray-900">E-mail</span>
                  <span className="break-all">{resume.personalDetails.email}</span>
                </div>
              ) : (
                <div className={placeholderOpacity}>
                  <span className="font-bold block text-gray-900">E-mail</span>
                  <span className="break-all">email@example.com</span>
                </div>
              )}

              {/* LinkedIn */}
              {resume.personalDetails.linkedin && (
                <div>
                  <span className="font-bold block text-gray-900">LinkedIn</span>
                  <a
                    href={ensureProtocol(resume.personalDetails.linkedin)}
                    className="text-blue-700 hover:underline break-all"
                  >
                    {cleanUrl(resume.personalDetails.linkedin)}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* SKILLS SECTION */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 uppercase tracking-wide border-b-2 border-gray-300 pb-2 mb-4">
              Skills
            </h3>
            {resume.skills.skills.length > 0 ? (
              <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-gray-700">
                {resume.skills.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <ul className={`list-disc list-outside ml-4 space-y-2 text-sm text-gray-700 ${placeholderOpacity}`}>
                <li>Skill 1</li>
                <li>Skill 2</li>
                <li>Skill 3</li>
              </ul>
            )}
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT - 8 columns (66%) */}
        <main className="col-span-8 bg-white p-10 pt-12">
          {/* HEADER: NAME & SUMMARY */}
          <div className="mb-10">
            <h1
              className="font-extrabold uppercase tracking-wide mb-6 leading-none"
              style={{
                fontSize: "3rem",
                color: "#1E3A8A",
              }}
            >
              {resume.personalDetails.fullName ? (
                <>
                  {resume.personalDetails.fullName.split(" ")[0]} <br />
                  {resume.personalDetails.fullName.split(" ").slice(1).join(" ")}
                </>
              ) : (
                <span className={placeholderOpacity}>
                  YOUR <br /> NAME
                </span>
              )}
            </h1>

            {resume.personalDetails.summary ? (
              <p className="text-gray-600 text-sm leading-relaxed text-justify">
                {resume.personalDetails.summary}
              </p>
            ) : (
              <p className={`text-gray-600 text-sm leading-relaxed text-justify ${placeholderOpacity}`}>
                Use this section to give recruiters a quick glimpse of your professional profile. In
                just 3-4 lines, highlight your background, education and main skills.
              </p>
            )}
          </div>

          {/* WORK HISTORY SECTION */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">
              Work History
            </h2>

            {resume.experience.length > 0 ? (
              <div className="flex flex-col gap-6">
                {resume.experience.map((job) => (
                  <div key={job.id} className="grid grid-cols-12 gap-4 break-inside-avoid">
                    {/* Left: Dates */}
                    <div className="col-span-3 text-xs font-bold text-gray-600 pt-1">
                      <div className="whitespace-pre-line">
                        {job.startDate} - <br /> {job.current ? "Present" : job.endDate}
                      </div>
                    </div>

                    {/* Right: Description */}
                    <div className="col-span-9">
                      <h3 className="text-lg font-bold text-gray-800 leading-tight">
                        {job.position}
                      </h3>
                      <div className="text-sm font-semibold text-gray-600 mb-2">
                        {job.company}
                        {job.location && `, ${job.location}`}
                      </div>

                      <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-600">
                        {job.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`flex flex-col gap-6 ${placeholderOpacity}`}>
                {/* Job 1 Placeholder */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-xs font-bold text-gray-600 pt-1">
                    <div className="whitespace-pre-line">
                      Month/Year - <br /> Month/Year
                    </div>
                  </div>
                  <div className="col-span-9">
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">Job Title</h3>
                    <div className="text-sm font-semibold text-gray-600 mb-2">Company Name, City</div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-600">
                      <li>Responsibilities</li>
                      <li>Responsibilities</li>
                      <li>Responsibilities</li>
                    </ul>
                  </div>
                </div>

                {/* Job 2 Placeholder */}
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-xs font-bold text-gray-600 pt-1">
                    <div className="whitespace-pre-line">
                      Month/Year - <br /> Month/Year
                    </div>
                  </div>
                  <div className="col-span-9">
                    <h3 className="text-lg font-bold text-gray-800 leading-tight">Job Title</h3>
                    <div className="text-sm font-semibold text-gray-600 mb-2">Company Name, City</div>
                    <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-gray-600">
                      <li>Responsibilities</li>
                      <li>Responsibilities</li>
                      <li>Responsibilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* EDUCATION SECTION */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2 mb-6">
              Education
            </h2>

            {resume.education.length > 0 ? (
              <div className="flex flex-col gap-6">
                {resume.education.map((edu) => (
                  <div key={edu.id} className="grid grid-cols-12 gap-4 break-inside-avoid">
                    {/* Left: Dates */}
                    <div className="col-span-3 text-xs font-bold text-gray-600 pt-1">
                      <div className="whitespace-pre-line">
                        {edu.startDate} - <br /> {edu.current ? "Present" : edu.endDate}
                      </div>
                    </div>

                    {/* Right: Description */}
                    <div className="col-span-9">
                      <h3 className="text-base font-bold text-gray-800 leading-tight">
                        {edu.degree} in {edu.field}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {edu.institution}
                        {edu.location && `, ${edu.location}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`flex flex-col gap-6 ${placeholderOpacity}`}>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-xs font-bold text-gray-600 pt-1">
                    <div className="whitespace-pre-line">
                      09/2017 - <br /> 07/2020
                    </div>
                  </div>
                  <div className="col-span-9">
                    <h3 className="text-base font-bold text-gray-800 leading-tight">
                      Degree in Field of Study
                    </h3>
                    <div className="text-sm text-gray-600">Institution Name, City</div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>

        {/* Print styles */}
        <style jsx>{`
          @media print {
            div[style*="210mm"] {
              box-shadow: none;
              margin: 0;
              page-break-inside: avoid;
              /* Force grid to display properly */
              display: grid !important;
              grid-template-columns: repeat(12, 1fr) !important;
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

            /* Force sidebar to be visible and preserve background */
            aside {
              display: block !important;
              grid-column: span 4 !important;
              background-color: #DBEAFE !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            /* Force main content to be visible */
            main {
              display: block !important;
              grid-column: span 8 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
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
