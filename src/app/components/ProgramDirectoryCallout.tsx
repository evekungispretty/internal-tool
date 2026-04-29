import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface ProgramDirectoryCalloutProps {
  programId: string;
  programName: string;
}

export function ProgramDirectoryCallout({ programId, programName }: ProgramDirectoryCalloutProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
          <ExternalLink className="h-4 w-4 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 mb-2">
            This page is managed in Program Directory
          </p>
          <div className="flex items-center gap-2">
            <button className="text-sm text-[#003087] hover:underline flex items-center gap-1">
              Open record
              <ArrowRight className="h-3 w-3" />
            </button>
            <span className="text-gray-300">·</span>
            <Button variant="link" className="h-auto p-0 text-sm text-[#003087]">
              Edit program details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
