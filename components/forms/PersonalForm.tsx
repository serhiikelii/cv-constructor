"use client";

import { useResumeStore } from "@/store/resumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, ChangeEvent } from "react";

export default function PersonalForm() {
  const { resume, updatePersonalDetails } = useResumeStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updatePersonalDetails({ [name]: value });
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalDetails({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updatePersonalDetails({ photo: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Photo Upload */}
      <div className="space-y-2">
        <Label htmlFor="photo">Profile Photo</Label>
        <div className="flex items-center gap-4">
          {resume.personalDetails.photo ? (
            <div className="relative">
              <img
                src={resume.personalDetails.photo}
                alt="Profile"
                className="h-24 w-24 rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                onClick={removePhoto}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div
              className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
          )}
          <input
            ref={fileInputRef}
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
        <p className="text-xs text-gray-500">
          Upload a professional photo (optional)
        </p>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          name="fullName"
          value={resume.personalDetails.fullName || ""}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Professional Title *</Label>
        <Input
          id="title"
          name="title"
          value={resume.personalDetails.title || ""}
          onChange={handleChange}
          placeholder="Senior Software Engineer"
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={resume.personalDetails.email || ""}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          required
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={resume.personalDetails.phone || ""}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          required
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={resume.personalDetails.location || ""}
          onChange={handleChange}
          placeholder="San Francisco, CA"
        />
      </div>

      {/* LinkedIn */}
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          name="linkedin"
          value={resume.personalDetails.linkedin || ""}
          onChange={handleChange}
          placeholder="linkedin.com/in/johndoe"
        />
      </div>

      {/* GitHub */}
      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          name="github"
          value={resume.personalDetails.github || ""}
          onChange={handleChange}
          placeholder="github.com/johndoe"
        />
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          value={resume.personalDetails.summary || ""}
          onChange={handleChange}
          placeholder="Brief overview of your professional background and key achievements..."
          rows={4}
          className="resize-none"
        />
        <p className="text-xs text-gray-500">
          A concise summary highlighting your expertise and career goals
        </p>
      </div>
    </div>
  );
}
