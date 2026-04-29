import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface PipelineStage {
  label: string;
  count: number;
  color: string;
}

const stages: PipelineStage[] = [
  { label: "Draft", count: 14, color: "bg-gray-200 text-gray-700" },
  { label: "In Review", count: 8, color: "bg-blue-100 text-blue-700" },
  { label: "Approved", count: 5, color: "bg-green-100 text-green-700" },
  { label: "Scheduled", count: 11, color: "bg-purple-100 text-purple-700" },
  { label: "Live today", count: 3, color: "bg-emerald-500 text-white" },
];

export function ContentPipeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 items-center">
          {stages.map((stage, index) => (
            <div key={stage.label} className="flex items-center gap-3 flex-1">
              <div className="flex-1 min-w-0">
                <Badge variant="secondary" className={`${stage.color} w-full justify-center py-2`}>
                  <span className="truncate">{stage.label}</span>
                  <span className="ml-2 font-bold">{stage.count}</span>
                </Badge>
              </div>
              {index < stages.length - 1 && (
                <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
