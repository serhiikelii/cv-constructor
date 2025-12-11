"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { User, Briefcase, GraduationCap, Award } from "lucide-react";
import PersonalForm from "../forms/PersonalForm";
import ExperienceForm from "../forms/ExperienceForm";
import EducationForm from "../forms/EducationForm";
import SkillsForm from "../forms/SkillsForm";

export default function EditorPanel() {
  return (
    <div className="h-full w-full">
      <div className="border-b bg-white p-4">
        <h2 className="text-lg font-semibold text-gray-900">Resume Editor</h2>
        <p className="text-sm text-gray-500">
          Fill in your information to build your resume
        </p>
      </div>

      <div className="p-4">
        <Accordion type="single" collapsible defaultValue="personal">
          {/* Personal Details Section */}
          <AccordionItem value="personal">
            <AccordionTrigger className="text-base font-medium hover:no-underline">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Personal Details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <PersonalForm />
            </AccordionContent>
          </AccordionItem>

          {/* Experience Section */}
          <AccordionItem value="experience">
            <AccordionTrigger className="text-base font-medium hover:no-underline">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span>Work Experience</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ExperienceForm />
            </AccordionContent>
          </AccordionItem>

          {/* Education Section */}
          <AccordionItem value="education">
            <AccordionTrigger className="text-base font-medium hover:no-underline">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                <span>Education</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <EducationForm />
            </AccordionContent>
          </AccordionItem>

          {/* Skills Section */}
          <AccordionItem value="skills">
            <AccordionTrigger className="text-base font-medium hover:no-underline">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>Skills</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <SkillsForm />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
