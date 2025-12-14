"use client";

import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2, Download, Printer } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import TemplateClassic from "../TemplateClassic";
import TemplateModern from "../TemplateModern";
import TemplateMinimal from "../TemplateMinimal";
import TemplateCreative from "../TemplateCreative";
import TemplateSidebar from "../TemplateSidebar";

export default function PreviewPanel() {
  const [zoom, setZoom] = useState(1);
  const [autoZoom, setAutoZoom] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const a4Ref = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const resume = useResumeStore((state) => state.resume);

  // Generate filename from resume data
  const getFileName = () => {
    const fullName = resume.personalDetails.fullName || "Resume";
    const sanitizedName = fullName.replace(/[^a-zA-Z0-9]/g, "_");
    return `${sanitizedName}_Resume.pdf`;
  };

  // Configure react-to-print
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: getFileName(),
    onBeforePrint: async () => {
      console.log("Preparing to print...");
    },
    onAfterPrint: async () => {
      console.log("Print completed");
    },
  });

  // Download as PDF
  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const element = printRef.current;
      const opt = {
        margin: 0,
        filename: getFileName(),
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          onclone: (clonedDoc: Document) => {
            // Remove or replace problematic styles
            const allElements = clonedDoc.querySelectorAll("*");
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              const computedStyle = window.getComputedStyle(el);

              // Fix lab() colors by converting to fallback
              ["color", "backgroundColor", "borderColor"].forEach((prop) => {
                const value = computedStyle.getPropertyValue(prop);
                if (value && value.includes("lab(")) {
                  htmlEl.style.setProperty(prop, "transparent");
                }
              });
            });
          }
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Calculate auto-fit zoom based on container width
  useEffect(() => {
    if (!autoZoom || !containerRef.current || !a4Ref.current) return;

    const calculateZoom = () => {
      const container = containerRef.current;
      const a4 = a4Ref.current;
      if (!container || !a4) return;

      const containerWidth = container.clientWidth;
      const padding = 32; // 16px padding on each side
      const availableWidth = containerWidth - padding;

      // A4 width is 210mm = 793.7px at 96 DPI
      const a4Width = 793.7;
      const calculatedZoom = Math.min(availableWidth / a4Width, 1);

      setZoom(calculatedZoom);
    };

    calculateZoom();

    const resizeObserver = new ResizeObserver(calculateZoom);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [autoZoom]);

  const handleZoomIn = () => {
    setAutoZoom(false);
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setAutoZoom(false);
    setZoom((prev) => Math.max(prev - 0.1, 0.3));
  };

  const handleFitToScreen = () => {
    setAutoZoom(true);
  };

  return (
    <div className="flex h-full w-full flex-col">
      {/* Zoom Controls - Fixed Header */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
            <p className="text-sm text-gray-500">
              Live preview of your resume
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 0.3}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>

            <div className="min-w-[60px] text-center text-sm font-medium">
              {Math.round(zoom * 100)}%
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 2}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleFitToScreen}
              className={autoZoom ? "bg-gray-100" : ""}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>

            <div className="mx-2 h-6 w-px bg-gray-300" />

            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="gap-2"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>

            <Button
              size="sm"
              onClick={handleDownloadPDF}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-gray-100 p-4"
      >
        <div className="flex min-h-full items-start justify-center">
          <div
            ref={a4Ref}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
              transition: autoZoom ? "transform 0.2s ease-out" : "none",
            }}
          >
            <div ref={printRef}>
              {resume.template === "modern" ? (
                <TemplateModern />
              ) : resume.template === "minimal" ? (
                <TemplateMinimal />
              ) : resume.template === "creative" ? (
                <TemplateCreative />
              ) : resume.template === "sidebar" ? (
                <TemplateSidebar />
              ) : (
                <TemplateClassic />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
