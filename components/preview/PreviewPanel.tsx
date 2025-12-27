"use client";

import { useState, useEffect, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2, Loader2 } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { TemplateMinimalPDF } from "../pdf/templates/TemplateMinimalPDF";
import { TemplateSidebarPDF } from "../pdf/templates/TemplateSidebarPDF";
import { TemplateClassicPDF } from "../pdf/templates/TemplateClassicPDF";
import PDFDownloadButton from "../PDFDownloadButton";

export default function PreviewPanel() {
  const [zoom, setZoom] = useState(1);
  const [autoZoom, setAutoZoom] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const a4Ref = useRef<HTMLDivElement>(null);

  const resume = useResumeStore((state) => state.resume);

  // Generate PDF Preview
  const generatePdfPreview = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Select PDF template based on resume.template
      let PDFComponent;
      switch (resume.template) {
        case "minimal":
          PDFComponent = TemplateMinimalPDF;
          break;
        case "sidebar":
          PDFComponent = TemplateSidebarPDF;
          break;
        case "classic":
          PDFComponent = TemplateClassicPDF;
          break;
        default:
          PDFComponent = TemplateClassicPDF;
      }

      // Generate PDF blob (with placeholders for preview)
      const blob = await pdf(<PDFComponent resume={resume} showPlaceholders={true} />).toBlob();

      // Revoke previous URL to avoid memory leaks
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }

      // Create new blob URL
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("Failed to generate PDF preview. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Regenerate PDF when resume or template changes (with debounce)
  useEffect(() => {
    // Debounce: wait 500ms after last change before regenerating
    const timeoutId = setTimeout(() => {
      generatePdfPreview();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [resume, resume.template]);

  // Cleanup PDF URL on unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);


  // Calculate auto-fit zoom based on container width
  useEffect(() => {
    // ONLY run when autoZoom is explicitly enabled by user
    if (!autoZoom) return;
    if (!containerRef.current || !a4Ref.current) return;

    const calculateZoom = () => {
      const container = containerRef.current;
      const a4 = a4Ref.current;
      if (!container || !a4) return;

      const containerWidth = container.clientWidth;
      const padding = 32; // 16px padding on each side
      const availableWidth = containerWidth - padding;

      // A4 width is 794px (210mm at 96 DPI)
      const a4Width = 794;
      const calculatedZoom = Math.min(availableWidth / a4Width, 1);

      // Set minimum zoom to 0.7 (70%) for better readability
      setZoom(Math.max(calculatedZoom, 0.7));
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
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
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
              disabled={zoom <= 0.5}
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

            <PDFDownloadButton resume={resume} />
          </div>
        </div>
      </div>

      {/* Preview Area - PDF iframe */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-gray-100 p-4"
      >
        {isGenerating ? (
          /* Loading State */
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-gray-400" />
              <p className="mt-4 text-sm text-gray-600">
                Generating PDF preview...
              </p>
            </div>
          </div>
        ) : error ? (
          /* Error State */
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-red-600">{error}</p>
              <Button
                size="sm"
                onClick={generatePdfPreview}
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          </div>
        ) : pdfUrl ? (
          /* PDF iframe */
          <div className="flex min-h-full items-start justify-center">
            <div
              ref={a4Ref}
              style={{
                width: `${794 * zoom}px`,
                height: `${1123 * zoom}px`,
                transition: autoZoom ? "all 0.2s ease-out" : "none",
              }}
            >
              <iframe
                src={pdfUrl ? `${pdfUrl}#view=FitH` : ''}
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                }}
                title="Resume PDF Preview"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
