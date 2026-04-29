import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ActionMenu } from "./ActionMenu";
import { User, ExternalLink, Flag, CheckCircle } from "lucide-react";

interface SEOIssue {
  id: string;
  severity: "critical" | "warning" | "info";
  issueType: string;
  affectedPage: string;
  site: string;
  firstDetected: string;
  status: "open" | "in-progress" | "resolved";
}

const mockIssues: SEOIssue[] = [
  {
    id: "1",
    severity: "critical",
    issueType: "Broken Link",
    affectedPage: "/programs/graduate-studies",
    site: "Academic Programs",
    firstDetected: "Apr 15, 2026",
    status: "open",
  },
  {
    id: "2",
    severity: "critical",
    issueType: "Missing Meta Description",
    affectedPage: "/faculty/directory",
    site: "Faculty Portal",
    firstDetected: "Apr 18, 2026",
    status: "in-progress",
  },
  {
    id: "3",
    severity: "warning",
    issueType: "Duplicate Title Tag",
    affectedPage: "/research/grants",
    site: "Research Portal",
    firstDetected: "Apr 10, 2026",
    status: "open",
  },
  {
    id: "4",
    severity: "critical",
    issueType: "Broken Link",
    affectedPage: "/alumni/events",
    site: "Alumni Portal",
    firstDetected: "Apr 20, 2026",
    status: "open",
  },
  {
    id: "5",
    severity: "warning",
    issueType: "Missing Alt Text",
    affectedPage: "/news/latest",
    site: "COE Main",
    firstDetected: "Apr 22, 2026",
    status: "resolved",
  },
  {
    id: "6",
    severity: "info",
    issueType: "Slow Page Speed",
    affectedPage: "/student-services/resources",
    site: "Student Services",
    firstDetected: "Apr 12, 2026",
    status: "in-progress",
  },
];

const severityConfig = {
  critical: { color: "bg-red-500", label: "Critical" },
  warning: { color: "bg-amber-500", label: "Warning" },
  info: { color: "bg-blue-500", label: "Info" },
};

const statusConfig = {
  open: { className: "bg-red-100 text-red-700 border-red-200", label: "Open" },
  "in-progress": { className: "bg-blue-100 text-blue-700 border-blue-200", label: "In Progress" },
  resolved: { className: "bg-green-100 text-green-700 border-green-200", label: "Resolved" },
};

export function IssueLogTable() {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSeverity = severityFilter === "all" || issue.severity === severityFilter;
    const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
    return matchesSeverity && matchesStatus;
  });

  const toggleIssue = (id: string) => {
    setSelectedIssues((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIssues.length === filteredIssues.length) {
      setSelectedIssues([]);
    } else {
      setSelectedIssues(filteredIssues.map((i) => i.id));
    }
  };

  return (
    <div className="bg-white border rounded-lg">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Issue Log</h3>
          <div className="flex items-center gap-3">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            {selectedIssues.length > 0 && (
              <Button variant="outline" size="sm">
                Assign Selected ({selectedIssues.length})
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="text-left p-4 w-12">
                <Checkbox
                  checked={selectedIssues.length === filteredIssues.length}
                  onCheckedChange={toggleAll}
                />
              </th>
              <th className="text-left p-4 text-sm font-medium w-24">Severity</th>
              <th className="text-left p-4 text-sm font-medium">Issue Type</th>
              <th className="text-left p-4 text-sm font-medium">Affected Page</th>
              <th className="text-left p-4 text-sm font-medium">Site</th>
              <th className="text-left p-4 text-sm font-medium">First Detected</th>
              <th className="text-left p-4 text-sm font-medium">Status</th>
              <th className="text-left p-4 text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredIssues.map((issue) => (
              <tr key={issue.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <Checkbox
                    checked={selectedIssues.includes(issue.id)}
                    onCheckedChange={() => toggleIssue(issue.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${severityConfig[issue.severity].color}`} />
                    <span className="text-sm capitalize">{issue.severity}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium">{issue.issueType}</span>
                </td>
                <td className="p-4">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {issue.affectedPage}
                  </code>
                </td>
                <td className="p-4">
                  <span className="text-sm">{issue.site}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{issue.firstDetected}</span>
                </td>
                <td className="p-4">
                  <Badge variant="outline" className={statusConfig[issue.status].className}>
                    {statusConfig[issue.status].label}
                  </Badge>
                </td>
                <td className="p-4">
                  <ActionMenu
                    size="sm"
                    items={[
                      {
                        label: "Assign to Team Member",
                        icon: <User className="h-4 w-4" />,
                        onClick: () => console.log("Assign"),
                      },
                      {
                        label: "View Page",
                        icon: <ExternalLink className="h-4 w-4" />,
                        onClick: () => console.log("View page"),
                      },
                      {
                        label: "Mark as Resolved",
                        icon: <CheckCircle className="h-4 w-4" />,
                        onClick: () => console.log("Mark resolved"),
                        divider: true,
                      },
                      {
                        label: "Ignore Issue",
                        icon: <Flag className="h-4 w-4" />,
                        onClick: () => console.log("Ignore"),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
