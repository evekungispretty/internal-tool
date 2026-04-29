export type PipelinePhase =
  | "draft"
  | "in-review"
  | "approved"
  | "scheduled"
  | "live-today";

export interface ContentIssue {
  id: string;
  title: string;
  siteName: string;
  urlSlug: string;
  issueType: "Outdated" | "Needs Review" | "Policy Change Required";
  ageDays: number;
  status: "unassigned" | "assigned" | "in-review" | "resolved";
  assignee?: {
    name: string;
    avatar: string;
  };
  dueDate?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  lastModified: string;
  flaggedReason: string;
  contentType: "Page" | "Post" | "Faculty Bio" | "Policy Doc";
  reviewer?: {
    name: string;
    avatar: string;
  };
  resolvedDate?: string;
  resolvedBy?: string;
  pipelinePhase: PipelinePhase;
}

export const mockIssues: ContentIssue[] = [
  {
    id: "1",
    title: "Graduate Program Requirements 2024",
    siteName: "Academic Programs",
    urlSlug: "/programs/graduate/requirements",
    issueType: "Outdated",
    ageDays: 487,
    status: "unassigned",
    contentType: "Page",
    lastModified: "2024-12-15",
    flaggedReason: "Content hasn't been updated in over 16 months",
    pipelinePhase: "draft",
  },
  {
    id: "2",
    title: "Dr. Sarah Martinez Faculty Profile",
    siteName: "Faculty Portal",
    urlSlug: "/faculty/martinez-sarah",
    issueType: "Needs Review",
    ageDays: 234,
    status: "assigned",
    assignee: { name: "Maya Johnson", avatar: "MJ" },
    dueDate: "2026-05-05",
    priority: "medium",
    contentType: "Faculty Bio",
    lastModified: "2025-09-10",
    flaggedReason: "Annual faculty bio review required",
    pipelinePhase: "in-review",
  },
  {
    id: "3",
    title: "Student Privacy Policy",
    siteName: "Student Services",
    urlSlug: "/policies/student-privacy",
    issueType: "Policy Change Required",
    ageDays: 612,
    status: "in-review",
    assignee: { name: "Alex Chen", avatar: "AC" },
    reviewer: { name: "Jordan Smith", avatar: "JS" },
    priority: "urgent",
    contentType: "Policy Doc",
    lastModified: "2024-08-20",
    flaggedReason: "FERPA regulations updated, policy needs revision",
    pipelinePhase: "scheduled",
  },
  {
    id: "4",
    title: "Campus Safety Guidelines",
    siteName: "COE Main",
    urlSlug: "/about/campus-safety",
    issueType: "Outdated",
    ageDays: 156,
    status: "resolved",
    resolvedDate: "2026-04-20",
    resolvedBy: "Sam Williams",
    contentType: "Page",
    lastModified: "2026-04-20",
    flaggedReason: "Emergency procedures updated",
    pipelinePhase: "live-today",
  },
  {
    id: "5",
    title: "Center for Reading annual outcomes",
    siteName: "Research Portal",
    urlSlug: "/research/reading-center/outcomes",
    issueType: "Needs Review",
    ageDays: 91,
    status: "assigned",
    assignee: { name: "Dana Reed", avatar: "DR" },
    priority: "low",
    contentType: "Post",
    lastModified: "2026-01-28",
    flaggedReason: "Editorial quality check requested before publish",
    pipelinePhase: "approved",
  },
];
