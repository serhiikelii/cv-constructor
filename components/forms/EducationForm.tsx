"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MonthYearPicker } from "@/components/ui/month-year-picker";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import type { Education } from "@/types";

// Helper functions to convert between Date and YYYY-MM string format
function stringToDate(dateStr: string | null | undefined): Date | undefined {
  if (!dateStr) return undefined;
  const [year, month] = dateStr.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, 1);
}

function dateToString(date: Date | undefined): string {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export default function EducationForm() {
  const { resume, addEducation, updateEducation, deleteEducation } =
    useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Education>>({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (editingId) {
      updateEducation(editingId, formData);
    } else {
      addEducation(formData as Omit<Education, "id">);
    }
    resetForm();
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData(edu);
  };

  const handleDelete = (id: string) => {
    deleteEducation(id);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    });
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="space-y-4 p-4">
      {/* Existing Education Items */}
      {resume.education.length > 0 && (
        <div className="space-y-2">
          <Label>Your Education</Label>
          <div className="space-y-2">
            {resume.education.map((edu) => (
              <div
                key={edu.id}
                className="flex items-center justify-between rounded-lg border bg-white p-3"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate || "")}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(edu)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(edu.id)}
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
            {editingId ? "Edit Education" : "Add Education"}
          </h3>
          {editingId && (
            <Button type="button" variant="ghost" size="sm" onClick={resetForm}>
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>

        {/* Institution */}
        <div className="space-y-2">
          <Label htmlFor="institution">Institution *</Label>
          <Input
            id="institution"
            name="institution"
            value={formData.institution || ""}
            onChange={handleChange}
            placeholder="Stanford University"
            required
          />
        </div>

        {/* Degree */}
        <div className="space-y-2">
          <Label htmlFor="degree">Degree *</Label>
          <Input
            id="degree"
            name="degree"
            value={formData.degree || ""}
            onChange={handleChange}
            placeholder="Bachelor of Science"
            required
          />
        </div>

        {/* Field of Study */}
        <div className="space-y-2">
          <Label htmlFor="field">Field of Study</Label>
          <Input
            id="field"
            name="field"
            value={formData.field || ""}
            onChange={handleChange}
            placeholder="Computer Science"
          />
        </div>

        {/* Date Range */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Start Date *</Label>
            <MonthYearPicker
              date={stringToDate(formData.startDate)}
              onDateChange={(date) => {
                setFormData((prev) => ({
                  ...prev,
                  startDate: dateToString(date),
                }));
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>End Date *</Label>
            <MonthYearPicker
              date={stringToDate(formData.endDate)}
              onDateChange={(date) => {
                setFormData((prev) => ({
                  ...prev,
                  endDate: dateToString(date),
                }));
              }}
              required
            />
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSave}
          disabled={
            !formData.institution ||
            !formData.degree ||
            !formData.startDate ||
            !formData.endDate
          }
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
              Add Education
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
