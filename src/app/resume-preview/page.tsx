"use client";

import dynamic from "next/dynamic";

const ResumePreview = dynamic(() => import("@/components/resume-preview"), { ssr: false });

export default function ResumePreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Resume Preview</h1>
      <ResumePreview />
    </div>
  );
}
