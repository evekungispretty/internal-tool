import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { 
  FileText, 
  Calendar, 
  AlertTriangle, 
  Link as LinkIcon, 
  Image as ImageIcon,
  FileSearch,
  CheckCircle2,
  XCircle
} from "lucide-react";

// Mock data for content audit
const outdatedPages = [
  {
    site: "College of Education Main Site",
    page: "Program Requirements 2020",
    url: "/programs/requirements-2020",
    lastModified: "2020-09-15",
    status: "outdated",
    ageInDays: 1498,
  },
  {
    site: "Special Education Department",
    page: "Faculty Bio - Dr. Johnson",
    url: "/faculty/johnson",
    lastModified: "2022-01-10",
    status: "needs-review",
    ageInDays: 1016,
  },
  {
    site: "Student Services Portal",
    page: "COVID-19 Policies",
    url: "/covid-policies",
    lastModified: "2021-08-20",
    status: "outdated",
    ageInDays: 1324,
  },
];

const brokenLinks = [
  {
    site: "Educational Technology",
    page: "Resources",
    brokenUrl: "https://old-resource-site.com/guide",
    linkText: "Complete Guide",
    statusCode: "404",
  },
  {
    site: "Faculty Directory",
    page: "Publications",
    brokenUrl: "https://research.ufl.edu/old-paper.pdf",
    linkText: "Download Paper",
    statusCode: "404",
  },
  {
    site: "Alumni Network",
    page: "Events Archive",
    brokenUrl: "https://events.education.ufl.edu/2019",
    linkText: "2019 Events",
    statusCode: "404",
  },
];

const missingAltText = [
  {
    site: "School Psychology Program",
    page: "About Us",
    imageCount: 5,
    missingAlt: 3,
  },
  {
    site: "Special Education Department",
    page: "Research Projects",
    imageCount: 12,
    missingAlt: 8,
  },
  {
    site: "College of Education Main Site",
    page: "News & Events",
    imageCount: 15,
    missingAlt: 2,
  },
];

const contentStats = [
  {
    title: "Outdated Content",
    value: 45,
    description: "Pages not updated in 2+ years",
    icon: Calendar,
    color: "text-yellow-600",
  },
  {
    title: "Broken Links",
    value: 23,
    description: "Links returning 404 errors",
    icon: LinkIcon,
    color: "text-red-600",
  },
  {
    title: "Missing Alt Text",
    value: 87,
    description: "Images without accessibility text",
    icon: ImageIcon,
    color: "text-orange-600",
  },
  {
    title: "Duplicate Content",
    value: 12,
    description: "Pages with similar content",
    icon: FileText,
    color: "text-blue-600",
  },
];

export function ContentAudit() {
  return (
    <div className="space-y-6">
      <Alert>
        <FileSearch className="h-4 w-4" />
        <AlertTitle>What is Content Audit?</AlertTitle>
        <AlertDescription>
          Content Audit helps you maintain high-quality, accessible, and up-to-date content across all your WordPress sites. 
          It automatically scans for outdated pages, broken links, accessibility issues, duplicate content, and SEO problems. 
          This ensures your sites provide accurate information and meet accessibility standards.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {contentStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Issues by Category</CardTitle>
          <CardDescription>
            Review and address content quality issues across your network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="outdated" className="space-y-4">
            <TabsList>
              <TabsTrigger value="outdated">Outdated Pages</TabsTrigger>
              <TabsTrigger value="broken">Broken Links</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>

            <TabsContent value="outdated" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Site</TableHead>
                      <TableHead>Page Title</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Age (Days)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outdatedPages.map((page, index) => (
                      <TableRow key={index}>
                        <TableCell className="max-w-[200px]">{page.site}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>{page.page}</div>
                            <div className="text-xs text-muted-foreground">{page.url}</div>
                          </div>
                        </TableCell>
                        <TableCell>{page.lastModified}</TableCell>
                        <TableCell>{page.ageInDays}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              page.status === "outdated" 
                                ? "bg-red-500/10 text-red-700" 
                                : "bg-yellow-500/10 text-yellow-700"
                            }
                          >
                            {page.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="broken" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Site</TableHead>
                      <TableHead>Page</TableHead>
                      <TableHead>Broken URL</TableHead>
                      <TableHead>Link Text</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brokenLinks.map((link, index) => (
                      <TableRow key={index}>
                        <TableCell className="max-w-[200px]">{link.site}</TableCell>
                        <TableCell>{link.page}</TableCell>
                        <TableCell className="max-w-[250px] truncate text-xs">
                          {link.brokenUrl}
                        </TableCell>
                        <TableCell>{link.linkText}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-red-500/10 text-red-700">
                            {link.statusCode}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Fix
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Site</TableHead>
                      <TableHead>Page</TableHead>
                      <TableHead>Total Images</TableHead>
                      <TableHead>Missing Alt Text</TableHead>
                      <TableHead>Compliance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {missingAltText.map((page, index) => {
                      const complianceRate = ((page.imageCount - page.missingAlt) / page.imageCount * 100).toFixed(0);
                      const isCompliant = page.missingAlt === 0;
                      
                      return (
                        <TableRow key={index}>
                          <TableCell className="max-w-[200px]">{page.site}</TableCell>
                          <TableCell>{page.page}</TableCell>
                          <TableCell>{page.imageCount}</TableCell>
                          <TableCell>
                            <span className="text-red-600">{page.missingAlt}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {isCompliant ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                              <span>{complianceRate}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Fix Issues
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Content Audit Features</CardTitle>
          <CardDescription>
            More capabilities you could implement in this tool
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 p-4 border rounded-lg">
              <h3 className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                SEO Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                Check meta titles, descriptions, heading structure, and keyword optimization across all pages
              </p>
            </div>

            <div className="space-y-2 p-4 border rounded-lg">
              <h3 className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Duplicate Content Detection
              </h3>
              <p className="text-sm text-muted-foreground">
                Identify pages with similar or identical content that could hurt SEO or confuse users
              </p>
            </div>

            <div className="space-y-2 p-4 border rounded-lg">
              <h3 className="flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-purple-600" />
                Content Inventory
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete catalog of all pages, posts, and media files with categorization and tagging
              </p>
            </div>

            <div className="space-y-2 p-4 border rounded-lg">
              <h3 className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Content Lifecycle Tracking
              </h3>
              <p className="text-sm text-muted-foreground">
                Set review schedules, expiration dates, and automated reminders for content updates
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
