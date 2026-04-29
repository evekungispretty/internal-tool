import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { sites, Site } from "../utils/mockData";
import { ExternalLink, Search, Download } from "lucide-react";

export function SitesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [themeFilter, setThemeFilter] = useState<string>("all");

  const filteredSites = sites.filter((site) => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || site.status === statusFilter;
    const matchesTheme = themeFilter === "all" || site.theme === themeFilter;
    
    return matchesSearch && matchesStatus && matchesTheme;
  });

  const exportToCSV = () => {
    const headers = ["Site Name", "URL", "Status", "Health", "Theme", "WP Version", "Visits (30d)", "Uptime"];
    const rows = filteredSites.map(site => [
      site.name,
      site.url,
      site.status,
      site.health,
      site.theme,
      site.wpVersion,
      site.visits.toString(),
      `${site.uptime}%`
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `wordpress-sites-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uniqueThemes = Array.from(new Set(sites.map(site => site.theme)));

  const getStatusColor = (status: Site['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-700 hover:bg-green-500/20';
      case 'archived':
        return 'bg-gray-500/10 text-gray-700 hover:bg-gray-500/20';
      default:
        return '';
    }
  };

  const getHealthColor = (health: Site['health']) => {
    switch (health) {
      case 'excellent':
        return 'bg-green-500/10 text-green-700 hover:bg-green-500/20';
      case 'good':
        return 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20';
      case 'critical':
        return 'bg-red-500/10 text-red-700 hover:bg-red-500/20';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select value={themeFilter} onValueChange={setThemeFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Themes</SelectItem>
            {uniqueThemes.map((theme) => (
              <SelectItem key={theme} value={theme}>
                {theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={exportToCSV} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Site Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>Theme</TableHead>
              <TableHead>WP Version</TableHead>
              <TableHead>Visits (30d)</TableHead>
              <TableHead>Uptime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSites.map((site) => (
              <TableRow key={site.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div>{site.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        {site.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(site.status)}>
                    {site.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getHealthColor(site.health)}>
                    {site.health}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {site.theme}
                </TableCell>
                <TableCell>{site.wpVersion}</TableCell>
                <TableCell>{site.visits.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={site.uptime >= 99 ? 'text-green-600' : site.uptime >= 97 ? 'text-yellow-600' : 'text-red-600'}>
                    {site.uptime}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
