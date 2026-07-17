"use client";

import { Button } from "@/components/Button";
import { content } from "@/data/content";
import { useState } from "react";

export function ResumeDownloadButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch(content.personal.resumeUrl);
      if (!response.ok) throw new Error("Resume not found");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "resume.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(content.personal.resumeUrl, "_blank");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" size="lg" loading={loading} onClick={handleDownload}>
      {!loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      )}
      Download Resume
    </Button>
  );
}
