"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import TemplateClassic from "../TemplateClassic";

export default function PreviewPanel() {
  const [zoom, setZoom] = useState(1);
  const [autoZoom, setAutoZoom] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const a4Ref = useRef<HTMLDivElement>(null);

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
            <TemplateClassic />
          </div>
        </div>
      </div>
    </div>
  );
}
