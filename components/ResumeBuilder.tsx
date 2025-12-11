"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditorPanel from "./editor/EditorPanel";
import PreviewPanel from "./preview/PreviewPanel";

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState("edit");

  return (
    <div className="flex h-screen w-full flex-col">
      {/* Mobile Tabs - Only visible on small screens */}
      <div className="border-b bg-white lg:hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel - Left Side (Desktop) / Tab Content (Mobile) */}
        <div
          className={`${
            activeTab === "edit" ? "block" : "hidden"
          } h-full w-full overflow-y-auto border-r bg-gray-50 lg:block lg:w-1/3`}
        >
          <EditorPanel />
        </div>

        {/* Preview Panel - Right Side (Desktop) / Tab Content (Mobile) */}
        <div
          className={`${
            activeTab === "preview" ? "block" : "hidden"
          } h-full w-full overflow-y-auto bg-gray-100 lg:block lg:w-2/3`}
        >
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
