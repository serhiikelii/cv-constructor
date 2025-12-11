"use client";

import { useState, KeyboardEvent } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

export default function SkillsForm() {
  const { resume, addTechnicalSkill, removeTechnicalSkill, addLanguage, removeLanguage } =
    useResumeStore();
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [proficiency, setProficiency] = useState<
    "Native" | "Fluent" | "Intermediate" | "Basic"
  >("Intermediate");

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      addTechnicalSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  const handleSkillKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

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
      {/* Technical Skills Section */}
      <div className="space-y-4">
        <div>
          <Label>Technical Skills</Label>
          <p className="text-xs text-gray-500">
            Add your technical skills, tools, and technologies
          </p>
        </div>

        {/* Skills Tags Display */}
        {resume.skills.technical.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resume.skills.technical.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeTechnicalSkill(skill)}
                  className="hover:text-blue-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Skill Input */}
        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleSkillKeyPress}
            placeholder="e.g., React, TypeScript, Node.js"
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddSkill}
            disabled={!skillInput.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Languages Section */}
      <div className="space-y-4">
        <div>
          <Label>Languages</Label>
          <p className="text-xs text-gray-500">
            Add languages you can speak or write
          </p>
        </div>

        {/* Languages List Display */}
        {resume.skills.languages.length > 0 && (
          <div className="space-y-2">
            {resume.skills.languages.map((lang, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border bg-white p-3"
              >
                <div>
                  <p className="font-medium text-gray-900">{lang.language}</p>
                  <p className="text-sm text-gray-600">{lang.proficiency}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLanguage(lang.language)}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add Language Input */}
        <div className="space-y-3">
          <Input
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            onKeyPress={handleLanguageKeyPress}
            placeholder="e.g., English, Spanish, Mandarin"
          />

          <div className="space-y-2">
            <Label htmlFor="proficiency">Proficiency Level</Label>
            <select
              id="proficiency"
              value={proficiency}
              onChange={(e) =>
                setProficiency(
                  e.target.value as
                    | "Native"
                    | "Fluent"
                    | "Intermediate"
                    | "Basic"
                )
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="Native">Native</option>
              <option value="Fluent">Fluent</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Basic">Basic</option>
            </select>
          </div>

          <Button
            type="button"
            onClick={handleAddLanguage}
            disabled={!languageInput.trim()}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Language
          </Button>
        </div>
      </div>
    </div>
  );
}
