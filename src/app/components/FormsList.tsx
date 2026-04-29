import { Plus, Copy, ExternalLink, Edit, Eye, Files, Archive, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ActionMenu } from "./ActionMenu";

interface FormsListProps {
  onEditForm: (id: string) => void;
}

interface MediaForm {
  id: string;
  name: string;
  slug: string;
  status: "active" | "draft" | "closed";
  site: string;
  submissionCount: number;
  lastSubmission: string;
  fieldCount: number;
  fileTypes: string[];
  maxSize: string;
}

const mockForms: MediaForm[] = [
  {
    id: "1",
    name: "Spring 2025 Campus Photo Drive",
    slug: "campus-photos",
    status: "active",
    site: "COE Main",
    submissionCount: 156,
    lastSubmission: "2 hours ago",
    fieldCount: 6,
    fileTypes: ["Images", "Video"],
    maxSize: "10MB",
  },
  {
    id: "2",
    name: "Faculty Research Highlights",
    slug: "research-highlights",
    status: "active",
    site: "Research Portal",
    submissionCount: 43,
    lastSubmission: "1 day ago",
    fieldCount: 5,
    fileTypes: ["Images"],
    maxSize: "10MB",
  },
  {
    id: "3",
    name: "Alumni Event Photos",
    slug: "alumni-events",
    status: "draft",
    site: "Alumni Portal",
    submissionCount: 0,
    lastSubmission: "Never",
    fieldCount: 4,
    fileTypes: ["Images", "Video"],
    maxSize: "25MB",
  },
];

const statusConfig = {
  active: { label: "Active", className: "bg-green-100 text-green-700 border-green-200" },
  draft: { label: "Draft", className: "bg-gray-100 text-gray-700 border-gray-200" },
  closed: { label: "Closed", className: "bg-red-100 text-red-700 border-red-200" },
};

export function FormsList({ onEditForm }: FormsListProps) {
  if (mockForms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Plus className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No forms yet</h3>
        <p className="text-muted-foreground mb-6">Create your first media collection form</p>
        <Button
          className="bg-[#003087] hover:bg-[#002866]"
          onClick={() => onEditForm("new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Form
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {mockForms.map((form) => (
        <div key={form.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-6">
            {/* Left Section */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 mb-2">
                <h3 className="font-semibold text-lg">{form.name}</h3>
                <Badge variant="outline" className={statusConfig[form.status].className}>
                  {statusConfig[form.status].label}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  education.ufl.edu/submit/{form.slug}
                </code>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <Badge variant="secondary" className="text-xs">
                {form.site}
              </Badge>
            </div>

            {/* Center Section */}
            <div className="flex-1 space-y-1">
              <p className="text-2xl font-bold">{form.submissionCount}</p>
              <p className="text-sm text-muted-foreground">submissions</p>
              <p className="text-xs text-muted-foreground">Last: {form.lastSubmission}</p>
              <p className="text-xs text-muted-foreground">
                {form.fieldCount} fields · {form.fileTypes.join(" + ")} · {form.maxSize} max
              </p>
            </div>

            {/* Right Section */}
            <div className="flex items-start justify-end">
              <ActionMenu
                items={[
                  {
                    label: "Edit Form",
                    icon: <Edit className="h-4 w-4" />,
                    onClick: () => onEditForm(form.id),
                  },
                  {
                    label: "View Submissions",
                    icon: <Eye className="h-4 w-4" />,
                    onClick: () => console.log("View submissions"),
                  },
                  {
                    label: "Open Live Form",
                    icon: <ExternalLink className="h-4 w-4" />,
                    onClick: () => console.log("Open live form"),
                    divider: true,
                  },
                  {
                    label: "Copy Shortcode",
                    icon: <Copy className="h-4 w-4" />,
                    onClick: () => console.log("Copy shortcode"),
                  },
                  {
                    label: "Duplicate Form",
                    icon: <Files className="h-4 w-4" />,
                    onClick: () => console.log("Duplicate"),
                  },
                  {
                    label: "Archive",
                    icon: <Archive className="h-4 w-4" />,
                    onClick: () => console.log("Archive"),
                    divider: true,
                  },
                  {
                    label: "Delete",
                    icon: <Trash2 className="h-4 w-4" />,
                    onClick: () => console.log("Delete"),
                    variant: "danger",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
