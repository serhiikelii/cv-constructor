"use client";

import { useResumeStore } from "@/store/resumeStore";
import type { Resume } from "@/types";

interface TemplateOption {
  id: Resume["template"];
  preview: React.ReactNode;
}

// Visual preview components for each template
const ClassicPreview = () => (
  <div className="h-full w-full rounded bg-white p-3 shadow-sm">
    <div className="mb-2 h-2 w-3/4 rounded bg-gray-800" />
    <div className="mb-3 h-1 w-1/2 rounded bg-gray-400" />
    <div className="space-y-1 border-t border-gray-300 pt-2">
      <div className="h-1 w-full rounded bg-gray-300" />
      <div className="h-1 w-5/6 rounded bg-gray-300" />
      <div className="h-1 w-4/6 rounded bg-gray-300" />
    </div>
  </div>
);

const ModernPreview = () => (
  <div className="h-full w-full rounded bg-white shadow-sm">
    <div className="flex h-full">
      <div className="w-2/5 rounded-l bg-blue-600 p-2">
        <div className="mb-2 h-1.5 w-3/4 rounded bg-white/90" />
        <div className="space-y-1">
          <div className="h-1 w-full rounded bg-white/70" />
          <div className="h-1 w-4/5 rounded bg-white/70" />
        </div>
      </div>
      <div className="w-3/5 p-2">
        <div className="mb-2 h-1.5 w-3/4 rounded bg-blue-600" />
        <div className="space-y-1">
          <div className="h-1 w-full rounded bg-gray-300" />
          <div className="h-1 w-5/6 rounded bg-gray-300" />
        </div>
      </div>
    </div>
  </div>
);

const MinimalPreview = () => (
  <div className="h-full w-full rounded bg-white p-2.5 shadow-sm">
    {/* Header */}
    <div className="mb-2">
      <div className="mb-1 h-2 w-3/5 rounded bg-blue-900" />
      <div className="h-0.5 w-4/5 rounded bg-gray-400 opacity-50" />
    </div>

    {/* Timeline sections */}
    <div className="relative pl-2.5">
      {/* Vertical line */}
      <div
        className="absolute left-0.5 top-0 bottom-0 w-0.5 bg-blue-900"
        style={{ height: "calc(100% - 2px)" }}
      />

      {/* Section 1 */}
      <div className="relative mb-2">
        <div className="absolute -left-2.5 top-0.5 h-1 w-1 rounded-full border border-blue-900 bg-white" />
        <div className="mb-0.5 h-0.5 w-3/4 rounded bg-blue-900" />
        <div className="space-y-0.5">
          <div className="h-0.5 w-full rounded bg-gray-300 opacity-50" />
          <div className="h-0.5 w-4/5 rounded bg-gray-300 opacity-50" />
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative mb-2">
        <div className="absolute -left-2.5 top-0.5 h-1 w-1 rounded-full border border-blue-900 bg-white" />
        <div className="mb-0.5 h-0.5 w-2/3 rounded bg-blue-900" />
        <div className="grid grid-cols-2 gap-0.5">
          <div className="h-0.5 rounded bg-gray-300 opacity-50" />
          <div className="h-0.5 rounded bg-gray-300 opacity-50" />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative">
        <div className="absolute -left-2.5 top-0.5 h-1 w-1 rounded-full border border-blue-900 bg-white" />
        <div className="mb-0.5 h-0.5 w-3/4 rounded bg-blue-900" />
        <div className="space-y-0.5">
          <div className="h-0.5 w-full rounded bg-gray-300 opacity-50" />
          <div className="h-0.5 w-3/4 rounded bg-gray-300 opacity-50" />
        </div>
      </div>
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

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Template</h3>
        <p className="text-xs text-gray-500">Choose a layout style</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {templates.map((tmpl) => (
          <button
            key={tmpl.id}
            onClick={() => setTemplate(tmpl.id)}
            className={`group relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all ${
              template === tmpl.id
                ? "border-blue-600 ring-2 ring-blue-600 ring-offset-2"
                : "border-gray-200 hover:border-blue-400 hover:shadow-md"
            }`}
            aria-label={`Select ${tmpl.id} template`}
          >
            {tmpl.preview}

            {/* Selected indicator */}
            {template === tmpl.id && (
              <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600">
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3">
        <p className="text-xs text-blue-800">
          <span className="font-semibold">Tip:</span> Click a card to switch templates instantly
        </p>
      </div>
    </div>
  );
}
