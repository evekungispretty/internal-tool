import { useState } from "react";
import { X, Calendar as CalendarIcon, User, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface NewContentFormProps {
  onClose: () => void;
}

export function NewContentForm({ onClose }: NewContentFormProps) {
  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState("post");
  const [selectedSite, setSelectedSite] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [publishTime, setPublishTime] = useState("09:00");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");
  const [enableApprovalChain, setEnableApprovalChain] = useState(false);

  const approvalStages = [
    { id: "1", name: "Content Editor", assignee: "Maya Johnson" },
    { id: "2", name: "Faculty Reviewer", assignee: "Unassigned" },
    { id: "3", name: "Communications Director", assignee: "Alex Chen" },
  ];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[90vh] bg-white rounded-lg shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Create New Content</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Schedule content for publication
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., New Graduate Programs Launch"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content Type & Site */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Content Type <span className="text-red-500">*</span>
              </label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">Blog Post</SelectItem>
                  <SelectItem value="news">News Article</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="page">Page</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Site <span className="text-red-500">*</span>
              </label>
              <Select value={selectedSite} onValueChange={setSelectedSite}>
                <SelectTrigger>
                  <SelectValue placeholder="Select site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coe-main">COE Main</SelectItem>
                  <SelectItem value="research">Research Portal</SelectItem>
                  <SelectItem value="alumni">Alumni Portal</SelectItem>
                  <SelectItem value="academic-affairs">Academic Affairs</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="student-services">Student Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Publish Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Publish Date</label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Publish Time</label>
              <Input
                type="time"
                value={publishTime}
                onChange={(e) => setPublishTime(e.target.value)}
              />
            </div>
          </div>

          {/* Assigned To */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Assigned To</label>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maya">Maya Johnson</SelectItem>
                <SelectItem value="alex">Alex Chen</SelectItem>
                <SelectItem value="jordan">Jordan Smith</SelectItem>
                <SelectItem value="sam">Sam Williams</SelectItem>
                <SelectItem value="taylor">Taylor Davis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Brief description of this content..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Approval Chain */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Approval Chain</label>
                <p className="text-xs text-muted-foreground mt-1">
                  Require approval from multiple reviewers before publishing
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableApprovalChain}
                  onChange={(e) => setEnableApprovalChain(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#003087]"></div>
              </label>
            </div>

            {enableApprovalChain && (
              <div className="space-y-2">
                {approvalStages.map((stage, index) => (
                  <div
                    key={stage.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-700 text-xs flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{stage.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {stage.assignee}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Pending
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Initial Status</label>
            <div className="flex gap-2">
              <button className="flex-1 p-3 border-2 border-[#003087] bg-[#003087]/5 rounded-lg">
                <div className="text-sm font-medium text-[#003087]">Draft</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Save as draft
                </div>
              </button>
              <button className="flex-1 p-3 border rounded-lg hover:border-gray-400 transition-colors">
                <div className="text-sm font-medium">Schedule</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Publish on date
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline">Save as Draft</Button>
            <Button className="bg-[#003087] hover:bg-[#002866]">
              Create Content
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
