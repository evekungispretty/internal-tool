import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { sites } from "../utils/mockData";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";

export function SiteHealth() {
  const criticalSites = sites.filter(site => site.health === 'critical');
  const warningSites = sites.filter(site => site.health === 'warning');
  const healthySites = sites.filter(site => site.health === 'excellent' || site.health === 'good');

  const healthPercentage = (healthySites.length / sites.length) * 100;

  const issues = [
    {
      type: 'critical',
      site: 'Student Services Portal',
      message: 'WordPress version is 2 major versions behind (6.5 → 6.7)',
      icon: AlertCircle,
    },
    {
      type: 'critical',
      site: 'Student Services Portal',
      message: 'Uptime below 96% threshold (95.3%)',
      icon: AlertCircle,
    },
    {
      type: 'warning',
      site: 'Special Education Department',
      message: 'Theme version is outdated (2023 → 2024)',
      icon: AlertTriangle,
    },
    {
      type: 'warning',
      site: 'Special Education Department',
      message: 'WordPress minor update available (6.6 → 6.7)',
      icon: AlertTriangle,
    },
    {
      type: 'info',
      site: 'Research & Innovation',
      message: 'Site is currently in maintenance mode',
      icon: Info,
    },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Network Health Overview</CardTitle>
          <CardDescription>
            Overall health status of all sites in the network
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Network Health Score</span>
              <span>{healthPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={healthPercentage} className="h-2" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm">Healthy</span>
              </div>
              <div className="text-2xl">{healthySites.length}</div>
              <p className="text-xs text-muted-foreground">Sites operating normally</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Warning</span>
              </div>
              <div className="text-2xl">{warningSites.length}</div>
              <p className="text-xs text-muted-foreground">Sites need attention</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm">Critical</span>
              </div>
              <div className="text-2xl">{criticalSites.length}</div>
              <p className="text-xs text-muted-foreground">Sites require immediate action</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Issues & Alerts</CardTitle>
          <CardDescription>
            Active issues that require attention across the network
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {issues.map((issue, index) => {
            const Icon = issue.icon;
            const alertVariant = issue.type === 'critical' ? 'destructive' : 'default';
            
            return (
              <Alert key={index} variant={alertVariant}>
                <Icon className="h-4 w-4" />
                <AlertTitle className="flex items-center gap-2">
                  {issue.site}
                  <Badge 
                    variant="outline" 
                    className={
                      issue.type === 'critical' 
                        ? 'bg-red-500/10 text-red-700' 
                        : issue.type === 'warning'
                        ? 'bg-yellow-500/10 text-yellow-700'
                        : 'bg-blue-500/10 text-blue-700'
                    }
                  >
                    {issue.type}
                  </Badge>
                </AlertTitle>
                <AlertDescription>{issue.message}</AlertDescription>
              </Alert>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
