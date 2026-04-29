import { X, Clock, CheckCircle2, AlertCircle, Circle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ContentItem } from "./EditorialCalendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ProgramDirectoryCallout } from "./ProgramDirectoryCallout";

interface ContentDetailPanelProps {
  content: ContentItem;
  onClose: () => void;
}

const statusConfig = {
  draft: { label: "Draft", className: "bg-gray-100 text-gray-700" },
  "in-review": { label: "In Review", className: "bg-yellow-100 text-yellow-700" },
  scheduled: { label: "Scheduled", className: "bg-blue-100 text-blue-700" },
  live: { label: "Live", className: "bg-green-100 text-green-700" },
};

const mockComments = [
  {
    id: "1",
    author: "Maya Johnson",
    avatar: "MJ",
    timestamp: "2h ago",
    text: "Updated the intro paragraph based on feedback from the legal team.",
  },
  {
    id: "2",
    author: "Alex Chen",
    avatar: "AC",
    timestamp: "5h ago",
    text: "Can we add more statistics to support the main points?",
  },
];

export function ContentDetailPanel({ content, onClose }: ContentDetailPanelProps) {
  const approvalChain = [
    { stage: "Author", status: "completed" as const, assignee: "Maya Johnson" },
    { stage: "Editor", status: "pending" as const, assignee: "Alex Chen" },
    { stage: "Legal", status: "waiting" as const, assignee: "Jordan Smith" },
    { stage: "Publish", status: "waiting" as const, assignee: "Auto" },
  ];

  const getStatusIcon = (status: "completed" | "pending" | "waiting") => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-300" />;
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-[500px] bg-white border-l shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-medium">Content Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Program Directory Callout */}
          {content.programId && content.programName && (
            <ProgramDirectoryCallout
              programId={content.programId}
              programName={content.programName}
            />
          )}

          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input defaultValue={content.title} />
          </div>

          {/* Site Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">Site</label>
            <Select defaultValue={content.siteName}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COE Main">COE Main</SelectItem>
                <SelectItem value="Research Portal">Research Portal</SelectItem>
                <SelectItem value="Alumni Portal">Alumni Portal</SelectItem>
                <SelectItem value="Academic Affairs">Academic Affairs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select defaultValue={content.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="live">Live</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Assignee */}
          <div>
            <label className="text-sm font-medium mb-2 block">Assignee</label>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-[#003087] text-white flex items-center justify-center text-sm font-medium">
                MJ
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Maya Johnson</p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>
          </div>

          {/* Scheduled Date/Time */}
          {content.date && (
            <div>
              <label className="text-sm font-medium mb-2 block">Scheduled Publish</label>
              <div className="flex items-center gap-2">
                <Input type="date" defaultValue={content.date} className="flex-1" />
                <Input type="time" defaultValue="09:00" className="w-28" />
              </div>
            </div>
          )}

          {/* Approval Chain */}
          <div>
            <label className="text-sm font-medium mb-3 block">Approval Chain</label>
            <div className="space-y-3">
              {approvalChain.map((step, index) => (
                <div key={step.stage} className="flex items-center gap-3">
                  {getStatusIcon(step.status)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{step.stage}</p>
                    <p className="text-xs text-muted-foreground">{step.assignee}</p>
                  </div>
                  {step.status === "pending" && (
                    <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                      Pending
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="text-sm font-medium mb-3 block">Comments</label>
            <div className="space-y-3 mb-3">
              {mockComments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="text-sm font-medium">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Textarea placeholder="Add a comment..." className="min-h-[80px]" />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t p-6 space-y-2">
          <Button className="w-full bg-[#003087] hover:bg-[#002866]">
            Submit for Review
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Save Draft
            </Button>
            <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
              Reject
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
