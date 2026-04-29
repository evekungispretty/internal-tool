import { X, Download, FileIcon, Calendar, Flag } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { MediaSubmission } from "./SubmissionsGallery";

interface SubmissionDetailDrawerProps {
  submission: MediaSubmission;
  onClose: () => void;
}

export function SubmissionDetailDrawer({ submission, onClose }: SubmissionDetailDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[380px] bg-white border-l shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium">Submission Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Preview */}
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            {submission.fileType === "image" ? (
              <p className="text-muted-foreground">Image Preview</p>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-gray-600 border-b-8 border-b-transparent ml-1" />
                </div>
                <p className="text-muted-foreground text-sm">Video Player</p>
              </div>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select defaultValue={submission.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input defaultValue={submission.title} />
          </div>

          {/* Submitter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Submitter</label>
            <div className="p-3 border rounded-lg bg-gray-50">
              <p className="text-sm font-medium">{submission.submitterName}</p>
              <a
                href={`mailto:${submission.submitterEmail}`}
                className="text-sm text-[#003087] hover:underline"
              >
                {submission.submitterEmail}
              </a>
            </div>
          </div>

          {/* Submitted Via */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Submitted Via</label>
            <div className="p-3 border rounded-lg bg-gray-50">
              <button className="text-sm text-[#003087] hover:underline font-medium">
                {submission.formName}
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select defaultValue={submission.category}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Research Events">Research Events</SelectItem>
                <SelectItem value="Faculty Resources">Faculty Resources</SelectItem>
                <SelectItem value="Student Life">Student Life</SelectItem>
                <SelectItem value="Alumni Relations">Alumni Relations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submitted */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Submitted</label>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {new Date(submission.submissionDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <Badge
                variant="outline"
                className={
                  submission.source === "Web Form"
                    ? "bg-blue-100 text-blue-700 border-blue-200"
                    : "bg-purple-100 text-purple-700 border-purple-200"
                }
              >
                {submission.source}
              </Badge>
            </div>
          </div>

          {/* Files */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Files ({submission.files.length})
            </label>
            <div className="border rounded-lg divide-y">
              {submission.files.map((file, index) => (
                <div key={index} className="p-3 flex items-center gap-3">
                  <FileIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.size} · {file.type}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download All as ZIP
            </Button>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Internal Notes</label>
            <Textarea
              placeholder="Add notes for team reference..."
              className="min-h-[100px]"
              defaultValue={submission.notes}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-2">
          <Button className="w-full bg-[#003087] hover:bg-[#002866]">
            Save Changes
          </Button>
          <Button variant="outline" className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Send to Editorial Calendar
          </Button>
          <Button variant="outline" className="w-full">
            <Flag className="h-4 w-4 mr-2" />
            Flag for Review
          </Button>
        </div>
      </div>
    </>
  );
}
