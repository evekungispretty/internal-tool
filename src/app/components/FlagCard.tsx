import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { ChevronDown, ChevronRight, Edit, Archive, FileText, Copy, Trash2 } from "lucide-react";
import { FeatureFlag } from "./FeatureFlags";
import { ActionMenu } from "./ActionMenu";

interface FlagCardProps {
  flag: FeatureFlag;
}

const categoryColors = {
  UI: "bg-blue-100 text-blue-700",
  Infra: "bg-purple-100 text-purple-700",
  Content: "bg-green-100 text-green-700",
};

const envColors = {
  Production: "bg-red-100 text-red-700 border-red-200",
  Staging: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export function FlagCard({ flag }: FlagCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [rolloutPercent, setRolloutPercent] = useState([flag.rolloutPercent]);

  return (
    <div
      className={`bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow ${
        flag.isStale ? "border-l-4 border-l-amber-500" : ""
      }`}
    >
      <div className="p-6">
        <div className="flex items-start gap-6">
          {/* Left Section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 mb-2">
              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                {flag.name}
              </code>
              {flag.isStale && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Stale
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{flag.description}</p>
            <div className="flex items-center gap-2 flex-wrap">
              {flag.environments.map((env) => (
                <Badge key={env} variant="outline" className={`text-xs ${envColors[env]}`}>
                  {env}
                </Badge>
              ))}
              <Badge variant="secondary" className={`text-xs ${categoryColors[flag.category]}`}>
                {flag.category}
              </Badge>
            </div>
          </div>

          {/* Center Section - Rollout Controls */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Switch checked={flag.enabled} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rollout</span>
                <span className="text-sm text-muted-foreground">
                  {rolloutPercent[0]}% of visitors
                </span>
              </div>
              <Slider
                value={rolloutPercent}
                onValueChange={setRolloutPercent}
                max={100}
                step={5}
                disabled={!flag.enabled}
              />
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-sm text-[#003087] hover:underline"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              Targeting Rules {flag.targetingRules.length > 0 && `(${flag.targetingRules.length})`}
            </button>

            {isExpanded && (
              <div className="mt-3 p-3 border rounded-lg bg-gray-50 space-y-2">
                {flag.targetingRules.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No targeting rules defined</p>
                ) : (
                  flag.targetingRules.map((rule, index) => (
                    <div key={index} className="text-sm">
                      <span className="text-muted-foreground">IF </span>
                      <code className="bg-white px-1 py-0.5 rounded text-xs">{rule.site}</code>
                      <span className="text-muted-foreground"> THEN </span>
                      <span className={rule.enabled ? "text-green-600" : "text-red-600"}>
                        {rule.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </div>
                  ))
                )}
                <button className="text-xs text-[#003087] hover:underline">+ Add Rule</button>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-end gap-3 min-w-[180px]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium">
                {flag.createdBy.avatar}
              </div>
              <span className="text-sm">{flag.createdBy.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">{flag.lastModified}</p>
            <ActionMenu
              items={[
                {
                  label: "Edit Flag",
                  icon: <Edit className="h-4 w-4" />,
                  onClick: () => console.log("Edit"),
                },
                {
                  label: "View Logs",
                  icon: <FileText className="h-4 w-4" />,
                  onClick: () => console.log("View logs"),
                  divider: true,
                },
                {
                  label: "Duplicate Flag",
                  icon: <Copy className="h-4 w-4" />,
                  onClick: () => console.log("Duplicate"),
                },
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
  );
}
