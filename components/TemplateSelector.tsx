"use client";

import { useResumeStore } from "@/store/resumeStore";
import type { Resume } from "@/types";

interface TemplateOption {
  id: Resume["template"];
  preview: React.ReactNode;
  description: string;
}

// Visual template previews showing layout structure
const ClassicPreview = () => (
  <div className="w-full h-full bg-white p-3 flex flex-col gap-2">
    {/* Header - centered */}
    <div className="flex flex-col items-center gap-1 pb-2 border-b border-gray-300">
      <div className="w-16 h-2 bg-gray-800 rounded"></div>
      <div className="w-12 h-1.5 bg-gray-600 rounded"></div>
      <div className="flex gap-1 mt-1">
        <div className="w-8 h-1 bg-gray-400 rounded"></div>
        <div className="w-8 h-1 bg-gray-400 rounded"></div>
      </div>
    </div>
    {/* Content sections */}
    <div className="flex flex-col gap-2">
      <div className="space-y-1">
        <div className="w-12 h-1.5 bg-gray-700 rounded"></div>
        <div className="w-full h-1 bg-gray-300 rounded"></div>
        <div className="w-full h-1 bg-gray-300 rounded"></div>
      </div>
      <div className="space-y-1">
        <div className="w-10 h-1.5 bg-gray-700 rounded"></div>
        <div className="w-full h-1 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

const MinimalPreview = () => (
  <div className="w-full h-full bg-white">
    <img
      src="/templates/minimal-preview.svg"
      alt="Minimal template preview"
      className="w-full h-full object-cover"
    />
  </div>
);

const SidebarPreview = () => (
  <div className="w-full h-full bg-white flex">
    {/* Sidebar - left column */}
    <div className="w-1/3 bg-gray-800 p-2 flex flex-col gap-2">
      <div className="w-full aspect-square bg-gray-600 rounded-full"></div>
      <div className="space-y-1">
        <div className="w-full h-1 bg-gray-500 rounded"></div>
        <div className="w-3/4 h-1 bg-gray-500 rounded"></div>
      </div>
      <div className="space-y-0.5 mt-1">
        <div className="w-full h-0.5 bg-gray-600 rounded"></div>
        <div className="w-full h-0.5 bg-gray-600 rounded"></div>
      </div>
    </div>
    {/* Main content - right column */}
    <div className="flex-1 p-2 flex flex-col gap-1.5">
      <div className="w-16 h-2 bg-gray-900 rounded"></div>
      <div className="w-12 h-1 bg-gray-600 rounded"></div>
      <div className="mt-1 space-y-1">
        <div className="w-10 h-1 bg-gray-700 rounded"></div>
        <div className="w-full h-0.5 bg-gray-300 rounded"></div>
        <div className="w-full h-0.5 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

const templates: TemplateOption[] = [
  {
    id: "classic",
    preview: <ClassicPreview />,
    description: "Traditional centered layout with clean sections",
  },
  {
    id: "minimal",
    preview: <MinimalPreview />,
    description: "Ultra-clean design with minimal spacing",
  },
  {
    id: "sidebar",
    preview: <SidebarPreview />,
    description: "Two-column layout with dark sidebar",
  },
];

export default function TemplateSelector() {
  const template = useResumeStore((state) => state.resume.template);
  const setTemplate = useResumeStore((state) => state.setTemplate);

  const templateLabels: Record<Resume["template"], string> = {
    classic: "Classic",
    minimal: "Minimal",
    sidebar: "Sidebar",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900">Choose Template</h3>
        <p className="mt-1 text-sm text-gray-500">Select a layout that best represents you</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tmpl) => (
          <div key={tmpl.id} className="flex flex-col gap-3">
            <button
              onClick={() => setTemplate(tmpl.id)}
              className={`group relative aspect-[210/297] overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                template === tmpl.id
                  ? "border-blue-500 shadow-lg ring-2 ring-blue-200 scale-[1.02]"
                  : "border-gray-300 hover:border-blue-400 hover:shadow-md hover:scale-[1.02]"
              }`}
              aria-label={`Select ${tmpl.id} template`}
            >
              {/* Template Preview */}
              <div className="relative h-full w-full bg-gray-50">
                {tmpl.preview}

                {/* Hover overlay */}
                {template !== tmpl.id && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                )}
              </div>

              {/* Selected indicator */}
              {template === tmpl.id && (
                <div className="absolute top-2 right-2">
                  <div className="h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>

            {/* Template info */}
            <div className="text-center px-2">
              <h4
                className={`text-base font-semibold mb-1 transition-colors ${
                  template === tmpl.id ? "text-blue-600" : "text-gray-900"
                }`}
              >
                {templateLabels[tmpl.id]}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {tmpl.description}
              </p>
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
