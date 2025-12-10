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
        }}
      >
        {/* Placeholder content */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            {resume.personalDetails.fullName || "Your Name"}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {resume.personalDetails.title || "Your Professional Title"}
          </p>
        </div>

        {/* Print styles will be added in Stage 7 */}
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
          }
        `}</style>
      </div>
    </div>
  );
}
