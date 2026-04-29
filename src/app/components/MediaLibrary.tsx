import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { FormsList } from "./FormsList";
import { SubmissionsGallery } from "./SubmissionsGallery";
import { FormEditor } from "./FormEditor";

export function MediaLibrary() {
  const [activeTab, setActiveTab] = useState<"forms" | "submissions">("forms");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [editingFormId, setEditingFormId] = useState<string | null>(null);

  // If editing a form, show the form editor
  if (editingFormId) {
    return <FormEditor formId={editingFormId} onClose={() => setEditingFormId(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2">Media Submission</h1>
          <p className="text-muted-foreground">
            {activeTab === "forms"
              ? "Create and manage media collection forms"
              : "Media submitted through your forms"}
          </p>
        </div>
        {activeTab === "forms" && (
          <Button
            className="bg-[#003087] hover:bg-[#002866]"
            onClick={() => setEditingFormId("new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Form
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b">
        <button
          onClick={() => setActiveTab("forms")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "forms"
              ? "border-[#003087] text-[#003087]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Forms
        </button>
        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "submissions"
              ? "border-[#003087] text-[#003087]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Submissions Gallery
        </button>
      </div>

      {/* Content */}
      {activeTab === "forms" ? (
        <FormsList onEditForm={(id) => setEditingFormId(id)} />
      ) : (
        <SubmissionsGallery
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
        />
      )}
    </div>
  );
}
