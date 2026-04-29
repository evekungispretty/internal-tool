import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Copy, Pause, Play, Archive, Trash2, Edit } from "lucide-react";
import { Experiment } from "./ABTestManager";
import { ActionMenu } from "./ActionMenu";

interface ExperimentCardProps {
  experiment: Experiment;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const statusConfig = {
  running: {
    label: "Running",
    className: "bg-green-100 text-green-700 border-green-200",
    hasPulse: true,
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    hasPulse: false,
  },
  completed: {
    label: "Completed",
    className: "bg-gray-100 text-gray-700 border-gray-200",
    hasPulse: false,
  },
  archived: {
    label: "Archived",
    className: "bg-gray-100 text-gray-500 border-gray-200",
    hasPulse: false,
  },
};

const contentTypeColors = {
  Layout: "bg-purple-100 text-purple-700",
  Copy: "bg-blue-100 text-blue-700",
  Feature: "bg-green-100 text-green-700",
};

export function ExperimentCard({ experiment, isExpanded, onToggleExpand }: ExperimentCardProps) {
  const config = statusConfig[experiment.status];

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* Left Section */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-2">{experiment.name}</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {experiment.siteName}
              </Badge>
              <Badge variant="secondary" className={`text-xs ${contentTypeColors[experiment.contentType]}`}>
                {experiment.contentType}
              </Badge>
              <Badge variant="outline" className={`text-xs ${config.className}`}>
                {config.hasPulse && (
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                )}
                {config.label}
              </Badge>
            </div>
          </div>

          {/* Center Section - Results */}
          {experiment.status !== "scheduled" && (
            <div className="flex-1">
              {experiment.winner && experiment.lift && (
                <div className="bg-green-50 border border-green-200 rounded-md px-3 py-1.5 mb-3">
                  <p className="text-sm text-green-700 font-medium">
                    Variant A winning +{experiment.lift}% lift
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Control</p>
                  <p className="text-2xl font-bold">{experiment.controlRate}%</p>
                  <p className="text-xs text-muted-foreground">
                    {experiment.controlSessions.toLocaleString()} sessions
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Variant A</p>
                  <p className="text-2xl font-bold">{experiment.variantRate}%</p>
                  <p className="text-xs text-muted-foreground">
                    {experiment.variantSessions.toLocaleString()} sessions
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-400"
                      style={{ width: `${experiment.trafficSplit.control}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {experiment.trafficSplit.control}/{experiment.trafficSplit.variant}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {experiment.confidence}% confidence
                </p>
              </div>
            </div>
          )}

          {/* Right Section */}
          <div className="flex flex-col items-end gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                {new Date(experiment.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
                {" → "}
                {new Date(experiment.endDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onToggleExpand}>
                {isExpanded ? "Hide" : "View"} Results
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 ml-1" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-1" />
                )}
              </Button>
              <ActionMenu
                items={[
                  {
                    label: "Edit Experiment",
                    icon: <Edit className="h-4 w-4" />,
                    onClick: () => console.log("Edit"),
                  },
                  {
                    label: "Duplicate Experiment",
                    icon: <Copy className="h-4 w-4" />,
                    onClick: () => console.log("Duplicate"),
                    divider: true,
                  },
                  ...(experiment.status === "running"
                    ? [
                        {
                          label: "Pause Experiment",
                          icon: <Pause className="h-4 w-4" />,
                          onClick: () => console.log("Pause"),
                        },
                      ]
                    : []),
                  ...(experiment.status === "scheduled"
                    ? [
                        {
                          label: "Start Now",
                          icon: <Play className="h-4 w-4" />,
                          onClick: () => console.log("Start now"),
                        },
                      ]
                    : []),
                  {
                    label: "Archive",
                    icon: <Archive className="h-4 w-4" />,
                    onClick: () => console.log("Archive"),
                    divider: true,
                  },
                  {
                    label: "Delete",
                    icon: <Trash2 className="h-4 w-4" />,
                    onClick: () => console.log("Delete"),
                    variant: "danger",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
