import { Plus, Copy, ExternalLink, Edit, Eye, Files, Archive, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ActionMenu } from "./ActionMenu";
import { mediaForms } from "../utils/mediaFormsData";

interface FormsListProps {
  onEditForm: (id: string) => void;
}

const statusConfig = {
  active: { label: "Active", className: "bg-green-100 text-green-700 border-green-200" },
  draft: { label: "Draft", className: "bg-gray-100 text-gray-700 border-gray-200" },
  closed: { label: "Closed", className: "bg-red-100 text-red-700 border-red-200" },
};

export function FormsList({ onEditForm }: FormsListProps) {
  if (mediaForms.length === 0) {
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
      {mediaForms.map((form) => (
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
                {form.fields.filter((field) => field.enabled !== false).length} fields ·{" "}
                {form.acceptedTypes.includes("MP4") || form.acceptedTypes.includes("MOV") ? "Images + Video" : "Images"} ·{" "}
                {form.maxSize}MB max
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {form.fields
                  .filter((field) => field.enabled !== false)
                  .slice(0, 4)
                  .map((field) => (
                    <Badge key={field.id} variant="secondary" className="text-xs font-normal">
                      {field.label}
                    </Badge>
                  ))}
              </div>
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
