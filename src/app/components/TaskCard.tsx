import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ActionItem } from "./ActionItemsDrawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

interface TaskCardProps {
  task: ActionItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const categoryConfig = {
  content: { color: "bg-blue-500", label: "Content" },
  experiment: { color: "bg-purple-500", label: "Experiment" },
  approval: { color: "bg-green-500", label: "Approval" },
  security: { color: "bg-red-500", label: "Security" },
  seo: { color: "bg-amber-500", label: "SEO" },
};

const priorityConfig = {
  low: { color: "bg-gray-400" },
  medium: { color: "bg-blue-400" },
  high: { color: "bg-amber-400" },
  urgent: { color: "bg-red-500" },
};

export function TaskCard({ task, isExpanded, onToggleExpand }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  const dueDate = new Date(task.dueDate);
  const today = new Date();
  const isOverdue = dueDate < today;

  const categoryInfo = categoryConfig[task.category];
  const priorityInfo = priorityConfig[task.priority];

  return (
    <div className={`p-4 ${!task.isRead ? "bg-blue-50" : ""}`}>
      <div className="flex items-start gap-3">
        {/* Category Icon */}
        <div className={`w-8 h-8 rounded-full ${categoryInfo.color} flex-shrink-0`} />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <button onClick={onToggleExpand} className="w-full text-left">
            <h4 className="font-medium text-sm mb-1">{task.title}</h4>
            <p className="text-xs text-muted-foreground">
              {task.source} · {task.site}
            </p>
          </button>

          {/* Expanded Content */}
          {isExpanded && task.description && (
            <div className="mt-3 space-y-3">
              <p className="text-sm text-muted-foreground">{task.description}</p>

              {task.relatedUrl && (
                <div className="text-xs">
                  <span className="text-muted-foreground">Related URL: </span>
                  <code className="bg-gray-100 px-1 py-0.5 rounded">{task.relatedUrl}</code>
                </div>
              )}

              {task.comments && task.comments.length > 0 && (
                <div className="space-y-2">
                  {task.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium flex-shrink-0">
                        {comment.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Select defaultValue={task.assignee.name}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Reassign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maya Johnson">Maya Johnson</SelectItem>
                    <SelectItem value="Alex Chen">Alex Chen</SelectItem>
                    <SelectItem value="Jordan Smith">Jordan Smith</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="date"
                  defaultValue={task.dueDate}
                  className="h-8 text-xs flex-1"
                />
              </div>

              <Button className="w-full h-8 text-xs bg-[#003087] hover:bg-[#002866]">
                Mark Complete
              </Button>
            </div>
          )}

          {/* Bottom Row */}
          {!isExpanded && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium">
                {task.assignee.avatar}
              </div>
              <button
                onClick={onToggleExpand}
                className="text-xs text-[#003087] hover:underline"
              >
                View
              </button>
              <Checkbox
                checked={isCompleted}
                onCheckedChange={(checked) => setIsCompleted(checked === true)}
                className="ml-auto"
              />
            </div>
          )}
        </div>

        {/* Right Side - Due Date & Priority */}
        {!isExpanded && (
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span
              className={`text-xs px-2 py-0.5 rounded ${
                isOverdue
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-muted-foreground"
              }`}
            >
              {dueDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <div className={`w-2 h-2 rounded-full ${priorityInfo.color}`} />
          </div>
        )}
      </div>
    </div>
  );
}
