import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, UserPlus } from "lucide-react";
import { ContentIssue } from "./ContentReview";

interface ContentCardProps {
  issue: ContentIssue;
  onClick: () => void;
}

const issueTypeColors = {
  Outdated: "bg-amber-100 text-amber-700 border-amber-200",
  "Needs Review": "bg-blue-100 text-blue-700 border-blue-200",
  "Policy Change Required": "bg-red-100 text-red-700 border-red-200",
};

export function ContentCard({ issue, onClick }: ContentCardProps) {
  const isOverdue =
    issue.dueDate && new Date(issue.dueDate) < new Date() && issue.status !== "resolved";

  return (
    <button
      onClick={onClick}
      className={`w-full bg-white border rounded-lg p-4 hover:shadow-md transition-shadow text-left ${
        issue.status === "resolved" ? "opacity-60" : ""
      }`}
    >
      <div className="space-y-3">
        {/* Title and Site */}
        <div>
          <h4 className="font-medium text-sm line-clamp-2 mb-1">{issue.title}</h4>
          <p className="text-xs text-muted-foreground">{issue.siteName}</p>
          <code className="text-xs bg-gray-100 px-1 py-0.5 rounded mt-1 inline-block">
            {issue.urlSlug}
          </code>
        </div>

        {/* Issue Type Badge */}
        <Badge variant="outline" className={`text-xs ${issueTypeColors[issue.issueType]}`}>
          {issue.issueType}
        </Badge>

        {/* Age */}
        <p className="text-xs text-muted-foreground">{issue.ageDays} days old</p>

        {/* Status-specific content */}
        {issue.status === "unassigned" && (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <UserPlus className="h-3 w-3 mr-2" />
            Assign
          </Button>
        )}

        {issue.status === "assigned" && issue.assignee && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium">
                {issue.assignee.avatar}
              </div>
              <span className="text-xs">{issue.assignee.name}</span>
            </div>
            {issue.dueDate && (
              <div className="flex items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                <span className={isOverdue ? "text-red-600" : "text-muted-foreground"}>
                  Due {new Date(issue.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        )}

        {issue.status === "in-review" && issue.reviewer && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium">
                {issue.reviewer.avatar}
              </div>
              <span className="text-xs">{issue.reviewer.name}</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs h-7"
                onClick={(e) => e.stopPropagation()}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-xs h-7"
                onClick={(e) => e.stopPropagation()}
              >
                Changes
              </Button>
            </div>
          </div>
        )}

        {issue.status === "resolved" && issue.resolvedDate && issue.resolvedBy && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Resolved {new Date(issue.resolvedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-xs text-muted-foreground">by {issue.resolvedBy}</p>
            <button
              className="text-xs text-[#003087] hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Reopen
            </button>
          </div>
        )}
      </div>
    </button>
  );
}
