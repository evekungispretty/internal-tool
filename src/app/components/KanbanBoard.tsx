import { ContentIssue } from "./ContentReview";
import { ContentCard } from "./ContentCard";

interface KanbanBoardProps {
  issues: ContentIssue[];
  onCardClick: (issue: ContentIssue) => void;
}

export function KanbanBoard({ issues, onCardClick }: KanbanBoardProps) {
  const columns = [
    {
      id: "unassigned",
      title: "Flagged — Unassigned",
      status: "unassigned" as const,
      color: "border-t-red-500",
    },
    {
      id: "assigned",
      title: "Assigned",
      status: "assigned" as const,
      color: "border-t-blue-500",
    },
    {
      id: "in-review",
      title: "In Review",
      status: "in-review" as const,
      color: "border-t-amber-500",
    },
    {
      id: "resolved",
      title: "Resolved",
      status: "resolved" as const,
      color: "border-t-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((column) => {
        const columnIssues = issues
          .filter((issue) => issue.status === column.status)
          .sort((a, b) => b.ageDays - a.ageDays); // Sort by age descending

        return (
          <div key={column.id} className="flex flex-col min-h-[600px]">
            <div className={`bg-white border-t-4 ${column.color} rounded-t-lg p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{column.title}</h3>
                <span className="text-sm text-muted-foreground">
                  {columnIssues.length}
                </span>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 border-x border-b rounded-b-lg p-4 space-y-3 overflow-y-auto">
              {columnIssues.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No items
                </div>
              ) : (
                columnIssues.map((issue) => (
                  <ContentCard
                    key={issue.id}
                    issue={issue}
                    onClick={() => onCardClick(issue)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
