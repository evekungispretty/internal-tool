import { useState } from "react";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";

interface ScheduledRollout {
  id: string;
  flagName: string;
  action: string;
  percent: number;
  date: string;
}

const mockScheduledRollouts: ScheduledRollout[] = [
  {
    id: "1",
    flagName: "new_nav_structure",
    action: "Enabled",
    percent: 100,
    date: "May 1",
  },
  {
    id: "2",
    flagName: "ai_content_suggestions",
    action: "Rollout to",
    percent: 50,
    date: "May 5",
  },
  {
    id: "3",
    flagName: "analytics_v2_dashboard",
    action: "Enabled",
    percent: 100,
    date: "May 10",
  },
];

export function ScheduledRollouts() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-blue-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-blue-700" />
          <h3 className="font-medium text-blue-900">Scheduled Rollouts</h3>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {mockScheduledRollouts.length} upcoming
          </Badge>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-blue-700" />
        ) : (
          <ChevronUp className="h-4 w-4 text-blue-700" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-blue-200 p-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {mockScheduledRollouts.map((rollout) => (
              <div
                key={rollout.id}
                className="flex-shrink-0 bg-white border border-blue-200 rounded-lg p-3 min-w-[280px]"
              >
                <div className="flex items-start justify-between mb-2">
                  <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                    {rollout.flagName}
                  </code>
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {rollout.date}
                  </Badge>
                </div>
                <p className="text-sm">
                  {rollout.action}{" "}
                  <span className="font-medium">{rollout.percent}%</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
