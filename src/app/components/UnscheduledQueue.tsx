import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "./ui/badge";
import { ContentItem } from "./EditorialCalendar";

interface UnscheduledQueueProps {
  items: ContentItem[];
}

const statusConfig = {
  draft: { label: "Draft", className: "bg-gray-100 text-gray-700" },
  "in-review": { label: "In Review", className: "bg-yellow-100 text-yellow-700" },
  scheduled: { label: "Scheduled", className: "bg-blue-100 text-blue-700" },
  live: { label: "Live", className: "bg-green-100 text-green-700" },
};

export function UnscheduledQueue({ items }: UnscheduledQueueProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-medium">Unscheduled Queue</h3>
          <Badge variant="secondary">{items.length} items</Badge>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t p-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[280px] p-4 border-2 border-dashed rounded-lg hover:border-[#003087] hover:bg-blue-50 transition-all cursor-move"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                    <Badge
                      variant="secondary"
                      className={statusConfig[item.status].className}
                    >
                      {statusConfig[item.status].label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-medium">
                      {item.author?.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span>{item.author}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.siteName}</span>
                    <span className="text-muted-foreground">
                      {item.daysSinceCreated} days ago
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Drag items to the calendar to schedule them
          </p>
        </div>
      )}
    </div>
  );
}
