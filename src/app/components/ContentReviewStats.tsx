import { AlertCircle, CheckCircle, Clock, Users } from "lucide-react";
import { ContentIssue } from "./ContentReview";

interface ContentReviewStatsProps {
  issues: ContentIssue[];
}

export function ContentReviewStats({ issues }: ContentReviewStatsProps) {
  const unassigned = issues.filter((i) => i.status === "unassigned").length;
  const assigned = issues.filter((i) => i.status === "assigned" || i.status === "in-review").length;
  const overdue = issues.filter(
    (i) => i.dueDate && new Date(i.dueDate) < new Date() && i.status !== "resolved"
  ).length;
  const resolvedThisMonth = issues.filter((i) => {
    if (!i.resolvedDate) return false;
    const resolved = new Date(i.resolvedDate);
    const now = new Date();
    return (
      resolved.getMonth() === now.getMonth() && resolved.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Unassigned Issues</p>
          <AlertCircle className="h-4 w-4 text-red-600" />
        </div>
        <div className="text-3xl font-bold text-red-600">{unassigned}</div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Assigned & In Progress</p>
          <Users className="h-4 w-4 text-blue-600" />
        </div>
        <div className="text-3xl font-bold text-blue-600">{assigned}</div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Overdue</p>
          <Clock className="h-4 w-4 text-amber-600" />
        </div>
        <div className="text-3xl font-bold text-amber-600">{overdue}</div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Resolved This Month</p>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </div>
        <div className="text-3xl font-bold text-green-600">{resolvedThisMonth}</div>
      </div>
    </div>
  );
}
