"use client";

import { useResumeStore } from "@/store/resumeStore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Resume } from "@/types";

interface TemplateOption {
  id: Resume["template"];
  name: string;
  description: string;
  preview: string;
}

const templates: TemplateOption[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional single-column layout with serif fonts. Professional and timeless.",
    preview: "📄",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Two-column grid layout with sans-serif fonts. Perfect for tech and startups.",
    preview: "🎨",
  },
];

export default function TemplateSelector() {
  const template = useResumeStore((state) => state.resume.template);
  const setTemplate = useResumeStore((state) => state.setTemplate);

  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Template</h3>
        <p className="text-xs text-gray-500">Choose a layout style for your resume</p>
      </div>

      <RadioGroup value={template} onValueChange={(value) => setTemplate(value as Resume["template"])}>
        <div className="space-y-3">
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              className={`relative flex items-start gap-3 rounded-lg border-2 p-3 transition-all ${
                template === tmpl.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <RadioGroupItem value={tmpl.id} id={tmpl.id} className="mt-0.5" />
              <div className="flex flex-1 items-start gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                  {tmpl.preview}
                </div>
                <div className="flex-1">
                  <Label htmlFor={tmpl.id} className="cursor-pointer">
                    <p className="font-semibold text-gray-900">{tmpl.name}</p>
                    <p className="mt-0.5 text-xs text-gray-600">{tmpl.description}</p>
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className="mt-3 rounded-md bg-blue-50 p-3">
        <p className="text-xs text-blue-800">
          <span className="font-semibold">Tip:</span> Preview updates instantly. Your choice applies to PDF export.
        </p>
      </div>
    </div>
  );
}
