import { X, ExternalLink, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ContentIssue } from "./ContentReview";

interface ContentDetailDrawerProps {
  issue: ContentIssue;
  onClose: () => void;
}

const issueTypeColors = {
  Outdated: "bg-amber-100 text-amber-700 border-amber-200",
  "Needs Review": "bg-blue-100 text-blue-700 border-blue-200",
  "Policy Change Required": "bg-red-100 text-red-700 border-red-200",
};

const priorityConfig = {
  low: { className: "bg-gray-100 text-gray-700", label: "Low" },
  medium: { className: "bg-blue-100 text-blue-700", label: "Medium" },
  high: { className: "bg-amber-100 text-amber-700", label: "High" },
  urgent: { className: "bg-red-100 text-red-700", label: "Urgent" },
};

const mockRevisions = [
  { author: "Jordan Smith", date: "2026-04-15", action: "Updated content" },
  { author: "Sam Williams", date: "2026-03-20", action: "Fixed typos" },
  { author: "Maya Johnson", date: "2026-02-10", action: "Added new section" },
];

const mockComments = [
  {
    id: "1",
    author: "Alex Chen",
    avatar: "AC",
    timestamp: "2h ago",
    text: "This needs legal review before we can publish the updates.",
  },
];

export function ContentDetailDrawer({ issue, onClose }: ContentDetailDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[600px] bg-white border-l shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-medium">Content Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Page Info */}
          <div className="space-y-3">
            <h3 className="font-medium text-lg">{issue.title}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Site</span>
                <span className="font-medium">{issue.siteName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">URL</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {issue.urlSlug}
                </code>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Modified</span>
                <span className="font-medium">
                  {new Date(issue.lastModified).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Content Type</span>
                <Badge variant="secondary">{issue.contentType}</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live Page
            </Button>
          </div>

          {/* Flagged Reason */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Flagged Reason</label>
            <div className="flex items-start gap-2">
              <Badge
                variant="outline"
                className={issueTypeColors[issue.issueType]}
              >
                {issue.issueType}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{issue.flaggedReason}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{issue.ageDays} days since last update</span>
            </div>
          </div>

          {/* Revision History */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Revision History</label>
            <div className="border rounded-lg divide-y">
              {mockRevisions.map((revision, index) => (
                <div key={index} className="p-3 text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{revision.author}</span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(revision.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">{revision.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Assignment */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Assignment</label>
            <div className="space-y-2">
              <Select defaultValue={issue.assignee?.name || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign to..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maya Johnson">Maya Johnson</SelectItem>
                  <SelectItem value="Alex Chen">Alex Chen</SelectItem>
                  <SelectItem value="Jordan Smith">Jordan Smith</SelectItem>
                  <SelectItem value="Sam Williams">Sam Williams</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                defaultValue={issue.dueDate}
                placeholder="Due date"
              />
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select defaultValue={issue.priority || "medium"}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select defaultValue={issue.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Link to Editorial Calendar */}
          <Button variant="outline" className="w-full">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Link to Editorial Calendar
          </Button>

          {/* Comments */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Notes/Comments</label>
            <div className="space-y-3 mb-3">
              {mockComments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="text-sm font-medium">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {comment.timestamp}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Textarea placeholder="Add a comment..." className="min-h-[80px]" />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <Button className="w-full bg-[#003087] hover:bg-[#002866]">
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}
