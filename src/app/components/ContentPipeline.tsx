import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { ExternalLink } from "lucide-react";
import { mockIssues, PipelinePhase } from "../utils/contentReviewData";

interface PipelineStage {
  id: PipelinePhase;
  label: string;
  color: string;
}

const stages: PipelineStage[] = [
  { id: "draft", label: "Draft", color: "bg-gray-200 text-gray-700" },
  { id: "in-review", label: "In Review", color: "bg-blue-100 text-blue-700" },
  { id: "approved", label: "Approved", color: "bg-green-100 text-green-700" },
  { id: "scheduled", label: "Scheduled", color: "bg-purple-100 text-purple-700" },
  { id: "live-today", label: "Live today", color: "bg-emerald-500 text-white" },
];

interface ContentPipelineProps {
  onViewContentReview?: () => void;
}

export function ContentPipeline({ onViewContentReview }: ContentPipelineProps) {
  const [selectedStageId, setSelectedStageId] = useState<PipelinePhase | null>(null);
  const issuesByStage = useMemo(
    () =>
      stages.reduce<Record<PipelinePhase, typeof mockIssues>>(
        (acc, stage) => {
          acc[stage.id] = mockIssues.filter((issue) => issue.pipelinePhase === stage.id);
          return acc;
        },
        {
          draft: [],
          "in-review": [],
          approved: [],
          scheduled: [],
          "live-today": [],
        },
      ),
    [],
  );
  const selectedStage = useMemo(
    () => stages.find((stage) => stage.id === selectedStageId) ?? null,
    [selectedStageId],
  );
  const selectedItems = selectedStage ? issuesByStage[selectedStage.id] : [];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Content Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 items-center">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => setSelectedStageId(stage.id)}
                >
                  <Badge variant="secondary" className={`${stage.color} py-2 px-4`}>
                    <span>{stage.label}</span>
                    <span className="ml-2 font-bold">{issuesByStage[stage.id].length}</span>
                  </Badge>
                </Button>
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

      <Sheet open={selectedStage !== null} onOpenChange={(open) => !open && setSelectedStageId(null)}>
        <SheetContent side="right" className="sm:max-w-md">
          {selectedStage && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedStage.label}</SheetTitle>
                <SheetDescription>
                  Items currently in this phase of the content pipeline.
                </SheetDescription>
              </SheetHeader>

              <div className="px-4 pb-4 space-y-4">
                <div className="rounded-md border">
                  {selectedItems.length > 0 ? (
                    <ul className="divide-y">
                      {selectedItems.map((item) => (
                        <li key={item.id} className="px-3 py-2">
                          <p className="text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.siteName}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-3 py-2 text-sm text-muted-foreground">
                      No items currently in this phase.
                    </p>
                  )}
                </div>

                <div className="rounded-md border bg-muted/40 p-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    For complete details and workflow actions, go to the Content Review page.
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => {
                      onViewContentReview?.();
                      setSelectedStageId(null);
                    }}
                  >
                    Go to Content Review
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
