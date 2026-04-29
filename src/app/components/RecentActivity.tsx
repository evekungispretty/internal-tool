import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock } from "lucide-react";

interface Activity {
  user: string;
  action: string;
  time: string;
}

const activities: Activity[] = [
  { user: "Maya", action: "published to 3 sites", time: "2h ago" },
  { user: "A/B Test #7", action: "reached significance", time: "5h ago" },
  { user: "Jordan", action: "updated theme on 5 sites", time: "6h ago" },
  { user: "Alex", action: "approved 3 content items", time: "1d ago" },
  { user: "System", action: "automated backup completed", time: "1d ago" },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-b-0 last:pb-0">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
