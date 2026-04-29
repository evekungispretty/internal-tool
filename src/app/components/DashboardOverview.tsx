import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Activity, AlertCircle, Globe, TrendingUp, Server, CheckCircle } from "lucide-react";
import { networkStats } from "../utils/mockData";

export function DashboardOverview() {
  const stats = [
    {
      title: "Total Sites",
      value: networkStats.totalSites,
      icon: Globe,
      change: "+1 this month",
      trend: "up",
    },
    {
      title: "Total Visits",
      value: networkStats.totalVisits.toLocaleString(),
      icon: TrendingUp,
      change: "+12.5% vs last week",
      trend: "up",
    },
    {
      title: "Average Uptime",
      value: `${networkStats.avgUptime}%`,
      icon: Activity,
      change: "Last 30 days",
      trend: "neutral",
    },
    {
      title: "Active Sites",
      value: networkStats.activeSites,
      icon: CheckCircle,
      change: `${networkStats.activeSites} of ${networkStats.totalSites}`,
      trend: "neutral",
    },
    {
      title: "Critical Issues",
      value: networkStats.criticalIssues,
      icon: AlertCircle,
      change: "Requires attention",
      trend: networkStats.criticalIssues > 0 ? "down" : "neutral",
    },
    {
      title: "Pending Updates",
      value: networkStats.pendingUpdates,
      icon: Server,
      change: "Across all sites",
      trend: "neutral",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-green-600' : 
                stat.trend === 'down' ? 'text-red-600' : 
                'text-muted-foreground'
              }`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
