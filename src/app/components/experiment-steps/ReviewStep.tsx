import { Badge } from "../ui/badge";
import { AlertTriangle } from "lucide-react";

export function ReviewStep() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Review & Launch</h3>
        <p className="text-sm text-muted-foreground">
          Review your experiment settings before launching
        </p>
      </div>

      {/* Warning Banner */}
      <div className="border border-amber-200 bg-amber-50 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-sm text-amber-900">Low traffic warning</p>
          <p className="text-sm text-amber-700">
            This test may take 6+ weeks to reach significance based on current traffic levels
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="border rounded-lg divide-y">
        {/* Basic Info */}
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-medium mb-3">Basic Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Experiment Name</span>
                <span className="text-sm font-medium">Homepage Hero CTA Button Test</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Goal Metric</span>
                <Badge variant="secondary">Conversion Rate</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Primary Site</span>
                <span className="text-sm font-medium">COE Main</span>
              </div>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-medium mb-3">Duration & Traffic</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Start Date</span>
                <span className="text-sm font-medium">May 1, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">End Date</span>
                <span className="text-sm font-medium">June 1, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Traffic Split</span>
                <span className="text-sm font-medium">50% / 50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Estimated Sample Size</span>
                <span className="text-sm font-medium">~12,400 sessions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-medium mb-3">Variants</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Control (Original)</p>
                  <p className="text-xs text-muted-foreground">Current live version</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Variant A - Blue CTA</p>
                  <p className="text-xs text-muted-foreground">Copy change: "Get Started Today"</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Targeting */}
        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-medium mb-3">Targeting</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Audience</span>
                <Badge variant="secondary">All Visitors</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Exclusions</span>
                <span className="text-sm font-medium">Internal traffic, Admins, Bots</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">URL Target</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">/homepage</code>
              </div>
            </div>
          </div>
        </div>

        {/* Hypothesis */}
        <div className="p-6">
          <h4 className="font-medium mb-3">Hypothesis</h4>
          <p className="text-sm text-muted-foreground">
            We believe that changing the CTA button text from "Learn More" to "Get Started Today"
            will result in higher conversion rates because it creates a stronger sense of urgency
            and provides clearer direction to visitors.
          </p>
        </div>
      </div>
    </div>
  );
}
