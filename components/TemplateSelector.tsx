"use client";

import { useResumeStore } from "@/store/resumeStore";
import type { Resume } from "@/types";
import TemplateClassic from "./TemplateClassic";
import TemplateModern from "./TemplateModern";
import TemplateMinimal from "./TemplateMinimal";

interface TemplateOption {
  id: Resume["template"];
  preview: React.ReactNode;
}

// Visual preview components - scaled down real templates
const ClassicPreview = () => (
  <div className="h-full w-full overflow-hidden bg-gray-100 flex items-center justify-center">
    <div
      style={{
        transform: "scale(0.18)",
        transformOrigin: "center center",
        width: "793.7px", // A4 width at 96 DPI
        height: "1122.5px", // A4 height at 96 DPI
      }}
    >
      <TemplateClassic />
    </div>
  </div>
);

const ModernPreview = () => (
  <div className="h-full w-full overflow-hidden bg-gray-100 flex items-center justify-center">
    <div
      style={{
        transform: "scale(0.18)",
        transformOrigin: "center center",
        width: "793.7px",
        height: "1122.5px",
      }}
    >
      <TemplateModern />
    </div>
  </div>
);

const MinimalPreview = () => (
  <div className="h-full w-full overflow-hidden bg-gray-100 flex items-center justify-center">
    <div
      style={{
        transform: "scale(0.18)",
        transformOrigin: "center center",
        width: "793.7px",
        height: "1122.5px",
      }}
    >
      <TemplateMinimal />
    </div>
  </div>
);

const templates: TemplateOption[] = [
  {
    id: "classic",
    preview: <ClassicPreview />,
  },
  {
    id: "modern",
    preview: <ModernPreview />,
  },
  {
    id: "minimal",
    preview: <MinimalPreview />,
  },
];

export default function TemplateSelector() {
  const template = useResumeStore((state) => state.resume.template);
  const setTemplate = useResumeStore((state) => state.setTemplate);

  const templateLabels: Record<Resume["template"], string> = {
    classic: "Classic",
    modern: "Modern",
    minimal: "Minimal",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900">Choose Template</h3>
        <p className="mt-1 text-sm text-gray-500">Select a layout that best represents you</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {templates.map((tmpl) => (
          <div key={tmpl.id} className="flex flex-col gap-2">
            <button
              onClick={() => setTemplate(tmpl.id)}
              className={`group relative aspect-[210/297] overflow-hidden transition-all duration-300 ${
                template === tmpl.id
                  ? "ring-2 ring-blue-500 shadow-lg scale-[1.02]"
                  : "border border-gray-200 hover:border-blue-300 hover:shadow-md hover:scale-[1.02]"
              }`}
              aria-label={`Select ${tmpl.id} template`}
            >
              {/* Preview */}
              <div className="relative h-full w-full">
                {tmpl.preview}

                {/* Gradient overlay on hover (non-selected) */}
                {template !== tmpl.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                )}
              </div>
            </button>

            {/* Template name label */}
            <div className="text-center">
              <span
                className={`text-sm font-medium transition-colors ${
                  template === tmpl.id
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                {templateLabels[tmpl.id]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100">
        <div className="flex items-start gap-3">
          <svg
            className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Tip:</span> Preview updates in real-time as you switch templates
          </p>
        </div>
      </div>
    </div>
  );
}
