import { useState } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { SEOScoreCards } from "./SEOScoreCards";
import { ScoreBySite } from "./ScoreBySite";
import { TopIssuesChart } from "./TopIssuesChart";
import { IssueLogTable } from "./IssueLogTable";
import { KeywordOpportunities } from "./KeywordOpportunities";

export function SEOHealth() {
  const [selectedSite, setSelectedSite] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2">SEO Health</h1>
          <p className="text-muted-foreground">
            Search performance across all 52 sites
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedSite} onValueChange={setSelectedSite}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Sites" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sites</SelectItem>
              <SelectItem value="coe-main">COE Main</SelectItem>
              <SelectItem value="research">Research Portal</SelectItem>
              <SelectItem value="alumni">Alumni Portal</SelectItem>
              <SelectItem value="faculty">Faculty Portal</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Input type="date" defaultValue="2026-03-01" className="w-[140px]" />
            <span className="text-muted-foreground">to</span>
            <Input type="date" defaultValue="2026-04-28" className="w-[140px]" />
          </div>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Top Row - Score Cards */}
      <SEOScoreCards />

      {/* Second Row - Score by Site & Top Issues */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ScoreBySite />
        <TopIssuesChart />
      </div>

      {/* Third Row - Issue Log Table */}
      <IssueLogTable />

      {/* Bottom Row - Keyword Opportunities */}
      <KeywordOpportunities />
    </div>
  );
}
