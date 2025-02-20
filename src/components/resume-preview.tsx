"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import ModernTemplate from './resume-templates/modern';
import { ProfessionalTemplate } from './resume-templates/professional';
import { TEMPLATES, type TemplateType } from './resume-templates';
import { CareerSuggestions } from './career-suggestions';

interface ResumeTemplateProps {
    formData: any; // Define this according to your form data structure
}

interface ResumeTemplates {
    modern: (props: ResumeTemplateProps) => JSX.Element;
    professional: (props: ResumeTemplateProps) => JSX.Element;
    minimal: (props: ResumeTemplateProps) => JSX.Element; // Ensure minimal is included
}

const resumeTemplates: ResumeTemplates = {
    modern: ({ formData }) => {
        return (
            <ModernTemplate formData={formData} />
        );
    },
    professional: ({ formData }) => {
        return (
            <ProfessionalTemplate formData={formData} />
        );
    },
    minimal: ({ formData }) => {
        return (
            <div>
                <h1>{formData.name}</h1>
                {/* Add more rendering logic for the minimal template */}
            </div>
        );
    },
};

const ResumePreview = () => {
  const [formData, setFormData] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(TEMPLATES.MODERN);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('resumeData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  const handleDownload = async () => {
    try {
      // Show loading state
      setIsLoading(true);

      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const TemplateComponent = resumeTemplates[selectedTemplate];

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-6">
      {/* Template Selector */}
      <div className="sticky top-2 sm:top-6 z-50 bg-white rounded-lg shadow-lg p-3 sm:p-4 mb-4 sm:mb-6
        w-full max-w-xl mx-auto">
        <h3 className="text-base sm:text-lg font-semibold mb-3">Choose Template</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={selectedTemplate === TEMPLATES.MODERN ? 'default' : 'outline'}
            onClick={() => setSelectedTemplate(TEMPLATES.MODERN)}
            className="w-full text-sm py-1.5 sm:py-2"
          >
            Modern
          </Button>
          <Button
            variant={selectedTemplate === TEMPLATES.PROFESSIONAL ? 'default' : 'outline'}
            onClick={() => setSelectedTemplate(TEMPLATES.PROFESSIONAL)}
            className="w-full text-sm py-1.5 sm:py-2"
          >
            Professional
          </Button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <TemplateComponent formData={formData} />
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="block sm:hidden text-center py-2 text-sm text-gray-500 bg-gray-50 border-t">
          Scroll horizontally to view full resume
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-0 sm:bottom-6 sm:right-6 bg-white sm:bg-transparent border-t sm:border-0 shadow-lg sm:shadow-none">
        <div className="max-w-4xl mx-auto sm:max-w-none flex items-center justify-end gap-2 sm:gap-4">
          <CareerSuggestions formData={formData} />
          <Button 
            onClick={handleDownload}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white 
              px-3 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-full
              shadow-lg hover:shadow-xl transition-all duration-300 
              flex items-center justify-center gap-1.5 sm:gap-2
              text-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
            <span className="sm:hidden">Download</span>
          </Button>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            margin: 1cm;
          }
          .fixed, .sticky {
            display: none !important;
          }
          .shadow-xl {
            box-shadow: none !important;
          }
          .min-w-[800px] {
            min-width: auto !important;
          }
          .overflow-x-auto {
            overflow: visible !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
