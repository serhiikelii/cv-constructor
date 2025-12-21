"use client";

import React, { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Resume } from '@/types';
import { TemplateMinimalPDF } from './pdf/templates/TemplateMinimalPDF';
import { TemplateSidebarPDF } from './pdf/templates/TemplateSidebarPDF';
import { TemplateClassicPDF } from './pdf/templates/TemplateClassicPDF';
import { generatePDFFilename } from '@/lib/pdf/pdfHelpers';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PDFDownloadButtonProps {
  resume: Resume;
  className?: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({ resume, className = '' }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Select the appropriate PDF template based on resume.template
      let PDFComponent;
      switch (resume.template) {
        case 'minimal':
          PDFComponent = TemplateMinimalPDF;
          break;
        case 'sidebar':
          PDFComponent = TemplateSidebarPDF;
          break;
        case 'classic':
          PDFComponent = TemplateClassicPDF;
          break;
        default:
          PDFComponent = TemplateMinimalPDF;
      }

      // Generate PDF blob
      const blob = await pdf(<PDFComponent resume={resume} />).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = generatePDFFilename(resume);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation error:', err);
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={className}>
      <Button
        size="sm"
        onClick={handleDownload}
        disabled={isGenerating}
        className="gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Download PDF
          </>
        )}
      </Button>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default PDFDownloadButton;
