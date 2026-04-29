import { useState } from "react";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Download, CheckCircle, XCircle, Image as ImageIcon, Video, Eye, Trash2, Flag } from "lucide-react";
import { MediaSubmission } from "./SubmissionsGallery";
import { ActionMenu } from "./ActionMenu";

interface SubmissionCardProps {
  submission: MediaSubmission;
  isSelected: boolean;
  onToggleSelect: () => void;
  onClick: () => void;
}

export function SubmissionCard({
  submission,
  isSelected,
  onToggleSelect,
  onClick,
}: SubmissionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusConfig = {
    new: { color: "bg-blue-500", label: "New" },
    reviewed: { color: "bg-gray-500", label: "Reviewed" },
    approved: { color: "bg-green-500", label: "Approved" },
    rejected: { color: "bg-red-500", label: "Rejected" },
  };

  return (
    <div
      className="relative break-inside-avoid mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`bg-white border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer ${
          isSelected ? "ring-2 ring-[#003087]" : ""
        }`}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-100" onClick={onClick}>
          {/* Status dot */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            <div
              className={`w-3 h-3 rounded-full ${statusConfig[submission.status].color}`}
              title={statusConfig[submission.status].label}
            />
          </div>

          {/* Video play overlay */}
          {submission.fileType === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
              </div>
            </div>
          )}

          {/* Hover checkbox */}
          {isHovered && (
            <div
              className="absolute top-2 left-2"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelect();
              }}
            >
              <Checkbox checked={isSelected} />
            </div>
          )}

          {/* Hover actions */}
          {isHovered && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              <button
                className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
                title="Approve"
              >
                <CheckCircle className="h-4 w-4" />
              </button>
              <button
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
                title="Reject"
              >
                <XCircle className="h-4 w-4" />
              </button>
              <button
                className="p-2 bg-white/90 rounded hover:bg-white transition-colors"
                onClick={(e) => e.stopPropagation()}
                title="Download"
              >
                <Download className="h-4 w-4 text-gray-700" />
              </button>
              <div className="bg-white/90 rounded" onClick={(e) => e.stopPropagation()}>
                <ActionMenu
                  size="sm"
                  items={[
                    {
                      label: "View Details",
                      icon: <Eye className="h-4 w-4" />,
                      onClick: onClick,
                    },
                    {
                      label: "Flag for Review",
                      icon: <Flag className="h-4 w-4" />,
                      onClick: () => console.log("Flag for review"),
                    },
                    {
                      label: "Delete",
                      icon: <Trash2 className="h-4 w-4" />,
                      onClick: () => console.log("Delete"),
                      variant: "danger",
                      divider: true,
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-medium text-sm line-clamp-2">{submission.title}</h3>
          <div className="text-xs text-muted-foreground">
            <p>{submission.submitterName}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {submission.formName}
          </Badge>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {new Date(submission.submissionDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <Badge variant="secondary" className="text-xs">
              {submission.category}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
