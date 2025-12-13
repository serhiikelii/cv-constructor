"use client";

import { useState, KeyboardEvent } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import SkillsInput from "@/components/SkillsInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SkillsForm() {
  const {
    resume,
    addSkill,
    removeSkill,
    reorderSkills,
    addTool,
    removeTool,
    reorderTools,
    addLanguage,
    removeLanguage
  } = useResumeStore();

  const [languageInput, setLanguageInput] = useState("");
  const [proficiency, setProficiency] = useState<
    "Native" | "Fluent" | "Professional" | "Intermediate" | "Basic"
  >("Intermediate");

  const handleAddLanguage = () => {
    if (languageInput.trim()) {
      addLanguage({
        language: languageInput.trim(),
        proficiency,
      });
      setLanguageInput("");
      setProficiency("Intermediate");
    }
  };

  const handleLanguageKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLanguage();
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Smart Skills Selector - Skills and Tools */}
      <SkillsInput
        skills={resume.skills.skills}
        onAddSkill={addSkill}
        onRemoveSkill={removeSkill}
        onReorderSkills={reorderSkills}
        tools={resume.skills.tools}
        onAddTool={addTool}
        onRemoveTool={removeTool}
        onReorderTools={reorderTools}
      />

      {/* Languages Section - Compact Modern UI */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-semibold">Languages</Label>
          <p className="text-xs text-gray-500">
            Add languages you can speak or write
          </p>
        </div>

        {/* Languages List - Compact Cards */}
        {resume.skills.languages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resume.skills.languages.map((lang, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{lang.language}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{lang.proficiency}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0"
                  onClick={() => removeLanguage(lang.language)}
                >
                  <X className="h-3 w-3 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add Language - Compact Inline Form */}
        <div className="flex gap-2">
          <Input
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            onKeyPress={handleLanguageKeyPress}
            placeholder="e.g., English, Spanish"
            className="flex-1"
          />

          <Select
            value={proficiency}
            onValueChange={(value) =>
              setProficiency(
                value as "Native" | "Fluent" | "Professional" | "Intermediate" | "Basic"
              )
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Proficiency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Native">Native</SelectItem>
              <SelectItem value="Fluent">Fluent</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="button"
            onClick={handleAddLanguage}
            disabled={!languageInput.trim()}
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
