import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface Alert {
  severity: "high" | "medium" | "low";
  title: string;
  count: string;
}

const alerts: Alert[] = [
  { severity: "high", title: "Accessibility errors", count: "2 sites" },
  { severity: "medium", title: "SEO score drop", count: "1 site" },
  { severity: "high", title: "Brand violation", count: "1 site" },
  { severity: "low", title: "Missing alt text", count: "4 sites" },
];

const getSeverityConfig = (severity: string) => {
  switch (severity) {
    case "high":
      return {
        icon: AlertCircle,
        className: "bg-red-100 text-red-700 border-red-200",
      };
    case "medium":
      return {
        icon: AlertTriangle,
        className: "bg-amber-100 text-amber-700 border-amber-200",
      };
    default:
      return {
        icon: Info,
        className: "bg-blue-100 text-blue-700 border-blue-200",
      };
  }
};

export function GovernanceAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Governance Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const config = getSeverityConfig(alert.severity);
            const Icon = config.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between pb-3 border-b last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.count}</p>
                  </div>
                </div>
                <Badge variant="outline" className={config.className}>
                  {alert.severity}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
