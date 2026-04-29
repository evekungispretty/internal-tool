import { ExternalLink, Plus, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface DocumentationItem {
  id: number;
  category: string;
  title: string;
  description: string;
  mondayLink?: string;
  googleDocLink?: string;
  lastUpdated: string;
  status: 'active' | 'archived';
  tags: string[];
}

const documentationData: DocumentationItem[] = [
  {
    id: 1,
    category: 'Onboarding',
    title: 'New Site Setup Process',
    description: 'Step-by-step guide for creating and configuring new WordPress sites',
    mondayLink: 'https://monday.com/boards/your-board',
    googleDocLink: 'https://docs.google.com/document/d/your-doc',
    lastUpdated: '2025-10-15',
    status: 'active',
    tags: ['setup', 'onboarding'],
  },
  {
    id: 2,
    category: 'Theme Management',
    title: 'Enfold Theme Customization Guide',
    description: 'Documentation for customizing and maintaining Enfold theme',
    mondayLink: 'https://monday.com/boards/your-board',
    googleDocLink: 'https://docs.google.com/document/d/your-doc',
    lastUpdated: '2025-10-12',
    status: 'active',
    tags: ['enfold', 'theme', 'customization'],
  },
  {
    id: 3,
    category: 'Theme Management',
    title: 'Divi COE Child Theme Updates',
    description: 'Tracking updates and modifications to Divi COE Child Theme',
    mondayLink: 'https://monday.com/boards/your-board',
    googleDocLink: 'https://docs.google.com/document/d/your-doc',
    lastUpdated: '2025-10-08',
    status: 'active',
    tags: ['divi', 'theme', 'updates'],
  },
  {
    id: 4,
    category: 'Security',
    title: 'Security Protocols & Best Practices',
    description: 'Security guidelines and incident response procedures',
    mondayLink: 'https://monday.com/boards/your-board',
    googleDocLink: 'https://docs.google.com/document/d/your-doc',
    lastUpdated: '2025-10-20',
    status: 'active',
    tags: ['security', 'protocols'],
  },
  {
    id: 5,
    category: 'Maintenance',
    title: 'Plugin Update Procedures',
    description: 'Guidelines for testing and deploying plugin updates',
    mondayLink: 'https://monday.com/boards/your-board',
    googleDocLink: 'https://docs.google.com/document/d/your-doc',
    lastUpdated: '2025-10-18',
    status: 'active',
    tags: ['plugins', 'maintenance'],
  },
  {
    id: 6,
    category: 'Troubleshooting',
    title: 'Common Issues & Solutions',
    description: 'Database of frequently encountered issues and their solutions',
    mondayLink: 'https://monday.com/boards/your-board',
    googleDocLink: 'https://docs.google.com/document/d/your-doc',
    lastUpdated: '2025-10-10',
    status: 'active',
    tags: ['troubleshooting', 'support'],
  },
  {
    id: 7,
    category: 'Performance',
    title: 'Site Speed Optimization',
    description: 'Performance optimization techniques and caching strategies',
    mondayLink: 'https://monday.com/boards/your-board',
    googleDocLink: 'https://docs.google.com/document/d/your-doc',
    lastUpdated: '2025-10-05',
    status: 'active',
    tags: ['performance', 'optimization'],
  },
  {
    id: 8,
    category: 'Content',
    title: 'Content Migration Guidelines',
    description: 'Process for migrating content between sites',
    mondayLink: 'https://monday.com/boards/your-board',
    googleDocLink: 'https://docs.google.com/document/d/your-doc',
    lastUpdated: '2025-09-28',
    status: 'archived',
    tags: ['content', 'migration'],
  },
  {
    id: 9,
    category: 'Backup & Recovery',
    title: 'Backup and Disaster Recovery Plan',
    description: 'Backup schedules and recovery procedures',
    mondayLink: 'https://monday.com/boards/your-board',
    googleDocLink: 'https://docs.google.com/document/d/your-doc',
    lastUpdated: '2025-10-22',
    status: 'active',
    tags: ['backup', 'recovery'],
  },
  {
    id: 10,
    category: 'Accessibility',
    title: 'WCAG Compliance Checklist',
    description: 'Accessibility standards and compliance requirements',
    mondayLink: 'https://monday.com/boards/your-board',
    googleDocLink: 'https://docs.google.com/document/d/your-doc',
    lastUpdated: '2025-10-19',
    status: 'active',
    tags: ['accessibility', 'wcag'],
  },
];

export function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = documentationData.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'archived':
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Team Documentation</CardTitle>
              <CardDescription>
                Centralized hub for Monday tickets and Google documentation
              </CardDescription>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Documentation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Links</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <span className="text-sm">{doc.category}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{doc.title}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground max-w-xs line-clamp-2">
                        {doc.description}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        {doc.mondayLink && (
                          <a
                            href={doc.mondayLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Monday
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {doc.googleDocLink && (
                          <a
                            href={doc.googleDocLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-800 hover:underline"
                          >
                            Google Doc
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {new Date(doc.lastUpdated).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredDocs.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No documentation found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Links Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="https://monday.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:underline text-blue-600"
            >
              <ExternalLink className="h-4 w-4" />
              Open Monday.com
            </a>
            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:underline text-green-600"
            >
              <ExternalLink className="h-4 w-4" />
              Open Google Drive
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Documentation Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Documents</span>
              <span>{documentationData.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Active</span>
              <span>{documentationData.filter(d => d.status === 'active').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Archived</span>
              <span>{documentationData.filter(d => d.status === 'archived').length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[...new Set(documentationData.map(d => d.category))].map((category) => (
                <Badge key={category} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
