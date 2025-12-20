"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MonthYearPicker } from "@/components/ui/month-year-picker";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import type { Certification } from "@/types";

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

export default function CertificationForm() {
  const { resume, addCertification, updateCertification, deleteCertification } =
    useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Certification>>({
    name: "",
    issuer: "",
    date: "",
    expiryDate: "",
    credentialId: "",
    url: "",
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
      updateCertification(editingId, formData);
    } else {
      addCertification(formData as Omit<Certification, "id">);
    }
    resetForm();
  };

  const handleEdit = (cert: Certification) => {
    setEditingId(cert.id);
    setFormData(cert);
  };

  const handleDelete = (id: string) => {
    deleteCertification(id);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
      url: "",
    });
  };

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  const certifications = resume.certifications || [];

  return (
    <div className="space-y-4 p-4">
      {/* Existing Certification Items */}
      {certifications.length > 0 && (
        <div className="space-y-2">
          <Label>Your Courses & Certifications</Label>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between rounded-lg border bg-white p-3"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(cert.date)}
                    {cert.expiryDate && ` - Expires: ${formatDate(cert.expiryDate)}`}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(cert)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(cert.id)}
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
            {editingId ? "Edit Course/Certification" : "Add Course/Certification"}
          </h3>
          {editingId && (
            <Button type="button" variant="ghost" size="sm" onClick={resetForm}>
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          )}
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Course/Certification Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="AWS Solutions Architect Associate"
            required
          />
        </div>

        {/* Issuer */}
        <div className="space-y-2">
          <Label htmlFor="issuer">Issuer/Platform *</Label>
          <Input
            id="issuer"
            name="issuer"
            value={formData.issuer || ""}
            onChange={handleChange}
            placeholder="Amazon Web Services, Coursera, Udemy, etc."
            required
          />
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label>Issue Date *</Label>
          <MonthYearPicker
            date={stringToDate(formData.date)}
            onDateChange={(date) => {
              setFormData((prev) => ({
                ...prev,
                date: dateToString(date),
              }));
            }}
            required
          />
        </div>

        {/* Expiry Date */}
        <div className="space-y-2">
          <Label>Expiry Date (optional)</Label>
          <MonthYearPicker
            date={stringToDate(formData.expiryDate)}
            onDateChange={(date) => {
              setFormData((prev) => ({
                ...prev,
                expiryDate: dateToString(date),
              }));
            }}
          />
        </div>

        {/* Credential ID */}
        <div className="space-y-2">
          <Label htmlFor="credentialId">Credential ID (optional)</Label>
          <Input
            id="credentialId"
            name="credentialId"
            value={formData.credentialId || ""}
            onChange={handleChange}
            placeholder="ABC123XYZ"
          />
        </div>

        {/* URL */}
        <div className="space-y-2">
          <Label htmlFor="url">Certificate URL (optional)</Label>
          <Input
            id="url"
            name="url"
            value={formData.url || ""}
            onChange={handleChange}
            placeholder="https://coursera.org/verify/ABC123"
          />
        </div>

        <Button
          type="button"
          onClick={handleSave}
          disabled={!formData.name || !formData.issuer || !formData.date}
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
              Add Course/Certification
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
