"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
} from "lucide-react";
import type { Experience } from "@/types";

type ExperienceFormData = Omit<Experience, "id" | "description"> & {
  description: string;
};

export default function ExperienceForm() {
  const { resume, addExperience, updateExperience, deleteExperience } =
    useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ExperienceFormData>>({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    const description = formData.description || "";
    const descriptionArray = description
      ? description.split("\n").filter((line) => line.trim())
      : [];

    const dataToSave = {
      ...formData,
      description: descriptionArray,
    };

    if (editingId) {
      updateExperience(editingId, dataToSave);
    } else {
      addExperience(dataToSave as Omit<Experience, "id">);
    }
    resetForm();
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData({
      ...exp,
      description: exp.description.join("\n"),
    });
  };

  const handleDelete = (id: string) => {
    deleteExperience(id);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="space-y-4 p-4">
      {/* Existing Experience Items */}
      {resume.experience.length > 0 && (
        <div className="space-y-2">
          <Label>Your Work Experience</Label>
          <div className="space-y-2">
            {resume.experience.map((exp) => (
              <div
                key={exp.id}
                className="flex items-center justify-between rounded-lg border bg-white p-3"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{exp.position}</p>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate || "")}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(exp)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(exp.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">
            {editingId ? "Edit Experience" : "Add Experience"}
          </h3>
          {editingId && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetForm}
            >
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            name="company"
            value={formData.company || ""}
            onChange={handleChange}
            placeholder="Google"
            required
          />
        </div>

        {/* Position */}
        <div className="space-y-2">
          <Label htmlFor="position">Position *</Label>
          <Input
            id="position"
            name="position"
            value={formData.position || ""}
            onChange={handleChange}
            placeholder="Senior Software Engineer"
            required
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            placeholder="San Francisco, CA"
            required
          />
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date *</Label>
            <Input
              id="startDate"
              name="startDate"
              type="month"
              value={formData.startDate || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="month"
              value={formData.endDate || ""}
              onChange={handleChange}
              disabled={formData.current}
            />
          </div>
        </div>

        {/* Current Position Checkbox */}
        <div className="flex items-center gap-2">
          <input
            id="current"
            name="current"
            type="checkbox"
            checked={formData.current || false}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="current" className="cursor-pointer font-normal">
            I currently work here
          </Label>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Describe your responsibilities and achievements (one per line)..."
            rows={4}
            className="resize-none"
          />
        </div>

        <Button
          type="button"
          onClick={handleSave}
          disabled={!formData.company || !formData.position || !formData.startDate || !formData.location}
          className="w-full"
        >
          {editingId ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
