import { Button } from "./ui/button";
import { Download, FolderInput, CheckCircle, XCircle, X } from "lucide-react";

interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export function BulkActionBar({ selectedCount, onClearSelection }: BulkActionBarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30">
      <div className="bg-[#003087] text-white rounded-lg shadow-xl px-6 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">{selectedCount} items selected</span>
          <button
            onClick={onClearSelection}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-white/20" />

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Download ZIP
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-white"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-white"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-white"
          >
            <FolderInput className="h-4 w-4 mr-2" />
            Move Category
          </Button>
        </div>
      </div>
    </div>
  );
}
