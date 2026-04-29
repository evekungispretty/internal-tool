import { useState } from "react";
import { Button } from "./ui/button";
import { Play, UserCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ContentReviewStats } from "./ContentReviewStats";
import { KanbanBoard } from "./KanbanBoard";
import { ContentDetailDrawer } from "./ContentDetailDrawer";
import { AutoAssignmentRules } from "./AutoAssignmentRules";
import { ContentIssue, mockIssues } from "../utils/contentReviewData";

export type { ContentIssue } from "../utils/contentReviewData";

export function ContentReview() {
  const [selectedSite, setSelectedSite] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedIssue, setSelectedIssue] = useState<ContentIssue | null>(null);

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSite = selectedSite === "all" || issue.siteName === selectedSite;
    const matchesStatus = selectedStatus === "all" || issue.status === selectedStatus;
    const matchesAge =
      selectedAge === "all" ||
      (selectedAge === "6mo" && issue.ageDays >= 180) ||
      (selectedAge === "1yr" && issue.ageDays >= 365) ||
      (selectedAge === "2yr" && issue.ageDays >= 730);
    const matchesType = selectedType === "all" || issue.contentType === selectedType;

    return matchesSite && matchesStatus && matchesAge && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2">Content Review</h1>
          <p className="text-muted-foreground">
            Pages flagged for editorial attention across your network
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Play className="h-4 w-4 mr-2" />
            Run New Scan
          </Button>
          <Button className="bg-[#003087] hover:bg-[#002866]">
            <UserCheck className="h-4 w-4 mr-2" />
            Assign All Unassigned
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={selectedSite} onValueChange={setSelectedSite}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Sites" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sites</SelectItem>
            <SelectItem value="COE Main">COE Main</SelectItem>
            <SelectItem value="Academic Programs">Academic Programs</SelectItem>
            <SelectItem value="Faculty Portal">Faculty Portal</SelectItem>
            <SelectItem value="Student Services">Student Services</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="in-review">In Review</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedAge} onValueChange={setSelectedAge}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Ages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ages</SelectItem>
            <SelectItem value="6mo">&gt;6 months</SelectItem>
            <SelectItem value="1yr">&gt;1 year</SelectItem>
            <SelectItem value="2yr">&gt;2 years</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Page">Page</SelectItem>
            <SelectItem value="Post">Post</SelectItem>
            <SelectItem value="Faculty Bio">Faculty Bio</SelectItem>
            <SelectItem value="Policy Doc">Policy Doc</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <ContentReviewStats issues={mockIssues} />

      {/* Kanban Board */}
      <KanbanBoard issues={filteredIssues} onCardClick={setSelectedIssue} />

      {/* Auto-Assignment Rules */}
      <AutoAssignmentRules />

      {/* Content Detail Drawer */}
      {selectedIssue && (
        <ContentDetailDrawer
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </div>
  );
}
