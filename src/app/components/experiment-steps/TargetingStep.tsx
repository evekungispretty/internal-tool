import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

export function TargetingStep() {
  const [excludeInternal, setExcludeInternal] = useState(true);

  const audienceFilters = [
    { id: "all", label: "All Visitors", active: true },
    { id: "new", label: "New Users", active: false },
    { id: "returning", label: "Returning", active: false },
    { id: "device", label: "Device Type", active: false },
    { id: "geo", label: "Geo", active: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-2">Audience Targeting</h3>
        <p className="text-sm text-muted-foreground">
          Define who will see this experiment
        </p>
      </div>

      {/* Audience Filters */}
      <div className="space-y-3">
        <Label className="text-base">Audience Filters</Label>
        <div className="flex flex-wrap gap-2">
          {audienceFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant={filter.active ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 ${
                filter.active
                  ? "bg-[#003087] hover:bg-[#002866]"
                  : "hover:bg-gray-100"
              }`}
            >
              {filter.label}
              {filter.active && filter.id !== "all" && (
                <X className="h-3 w-3 ml-2" />
              )}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Click to add or remove audience segments
        </p>
      </div>

      {/* Audience Breakdown */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h4 className="font-medium mb-4">Estimated Audience</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Eligible Visitors</span>
            <span className="font-medium">~24,800 / month</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Per Variant (50/50 split)</span>
            <span className="font-medium">~12,400 / month</span>
          </div>
        </div>
      </div>

      {/* Exclusions */}
      <div className="space-y-4">
        <Label className="text-base">Exclusions</Label>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium text-sm">Exclude internal traffic</p>
            <p className="text-xs text-muted-foreground">
              Remove visits from UF network IP addresses
            </p>
          </div>
          <Switch checked={excludeInternal} onCheckedChange={setExcludeInternal} />
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium text-sm">Exclude logged-in admins</p>
            <p className="text-xs text-muted-foreground">
              Prevent admin users from seeing test variants
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium text-sm">Exclude bots & crawlers</p>
            <p className="text-xs text-muted-foreground">
              Filter out non-human traffic automatically
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      {/* URL Targeting */}
      <div className="space-y-3">
        <Label className="text-base">URL Targeting</Label>
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Target URL:</span>
              <code className="text-sm bg-white px-2 py-1 rounded border">
                /homepage
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Match Type:</span>
              <span className="text-sm font-medium">Exact match</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
