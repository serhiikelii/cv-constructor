"use client";

import { useResumeStore } from "@/store/resumeStore";

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
        {/* Header - Name and Title */}
        <div className="text-center">
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
          <p
            className="mt-2"
            style={{
              fontFamily: "var(--font-open-sans)",
              fontSize: "1rem", // 16px ≈ 12pt
              color: "#6B7280", // gray-500 for screen
            }}
          >
            {resume.personalDetails.title || "Your Professional Title"}
          </p>
        </div>

        {/* Section Example - For testing typography */}
        <h2
          className="mb-2 mt-6 uppercase"
          style={{
            fontFamily: "var(--font-merriweather)",
            fontSize: "0.875rem", // 14px ≈ 10.5pt
            fontWeight: 700,
            borderBottom: "1px solid #000000",
            paddingBottom: "4px",
          }}
        >
          Experience
        </h2>

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
            }

            /* Ensure proper font rendering in print */
            h1,
            h2,
            p {
              color: #000000;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
