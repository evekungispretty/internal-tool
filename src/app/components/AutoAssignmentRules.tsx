import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";

interface AssignmentRule {
  id: string;
  condition: string;
  value: string;
  assignTo: string;
}

const mockRules: AssignmentRule[] = [
  {
    id: "1",
    condition: "Content Type",
    value: "Faculty Bio",
    assignTo: "Department Admin",
  },
  {
    id: "2",
    condition: "Issue",
    value: "Policy Doc outdated",
    assignTo: "Legal Reviewer",
  },
  {
    id: "3",
    condition: "Site",
    value: "Student Services",
    assignTo: "Maya Chen",
  },
];

export function AutoAssignmentRules() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-medium">Auto-Assignment Rules</h3>
          <span className="text-sm text-muted-foreground">
            {mockRules.length} {mockRules.length === 1 ? "rule" : "rules"} active
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Automatically assign content issues based on conditions
          </p>

          <div className="space-y-3">
            {mockRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <span className="text-muted-foreground">IF</span>
                    <code className="bg-white px-2 py-1 rounded border text-xs">
                      {rule.condition} = {rule.value}
                    </code>
                    <span className="text-muted-foreground">THEN</span>
                    <code className="bg-white px-2 py-1 rounded border text-xs">
                      Assign to = {rule.assignTo}
                    </code>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
        </div>
      )}
    </div>
  );
}
