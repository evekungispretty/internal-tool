import { useState } from "react";
import { X, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { TaskCard } from "./TaskCard";
import { QuickCreateTask } from "./QuickCreateTask";

export interface ActionItem {
  id: string;
  title: string;
  source: string;
  site: string;
  category: "content" | "experiment" | "approval" | "security" | "seo";
  dueDate: string;
  priority: "low" | "medium" | "high";
  assignee: {
    name: string;
    avatar: string;
  };
  description?: string;
  relatedUrl?: string;
  isRead: boolean;
  comments?: {
    id: string;
    author: string;
    avatar: string;
    timestamp: string;
    text: string;
  }[];
}

interface ActionItemsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockTasks: ActionItem[] = [
  {
    id: "1",
    title: "Update COVID-19 Policies page",
    source: "Flagged by Content Review",
    site: "Student Services Portal",
    category: "content",
    dueDate: "2026-04-25",
    priority: "high",
    assignee: { name: "Maya Johnson", avatar: "MJ" },
    isRead: false,
    description: "Content is outdated and needs to reflect current university guidelines",
    relatedUrl: "/policies/covid-19",
    comments: [
      {
        id: "1",
        author: "Alex Chen",
        avatar: "AC",
        timestamp: "1d ago",
        text: "Please coordinate with Health Services before updating",
      },
    ],
  },
  {
    id: "2",
    title: "Fix broken links in Faculty Directory",
    source: "SEO Health Scan",
    site: "Faculty Portal",
    category: "seo",
    dueDate: "2026-04-26",
    priority: "high",
    assignee: { name: "Jordan Smith", avatar: "JS" },
    isRead: false,
    relatedUrl: "/faculty/directory",
  },
  {
    id: "3",
    title: "Approve experiment: Homepage Hero CTA",
    source: "Experiments",
    site: "COE Main",
    category: "approval",
    dueDate: "2026-04-28",
    priority: "medium",
    assignee: { name: "Sam Williams", avatar: "SW" },
    isRead: true,
    relatedUrl: "/experiments/homepage-hero",
  },
  {
    id: "4",
    title: "Review SSL certificate expiration",
    source: "Security Monitor",
    site: "All Sites",
    category: "security",
    dueDate: "2026-04-28",
    priority: "urgent",
    assignee: { name: "Taylor Davis", avatar: "TD" },
    isRead: false,
  },
  {
    id: "5",
    title: "Update Faculty Bio: Dr. Martinez",
    source: "Content Review",
    site: "Faculty Portal",
    category: "content",
    dueDate: "2026-04-30",
    priority: "low",
    assignee: { name: "Maya Johnson", avatar: "MJ" },
    isRead: true,
  },
  {
    id: "6",
    title: "Optimize meta descriptions",
    source: "SEO Health",
    site: "Academic Programs",
    category: "seo",
    dueDate: "2026-05-02",
    priority: "medium",
    assignee: { name: "Jordan Smith", avatar: "JS" },
    isRead: true,
  },
];

type TabType = "my-tasks" | "assigned-by-me" | "all-network";
type FilterType = "all" | "content" | "seo" | "experiments" | "approvals" | "security";

export function ActionItemsDrawer({ isOpen, onClose }: ActionItemsDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("my-tasks");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [showLater, setShowLater] = useState(false);
  const [showQuickCreate, setShowQuickCreate] = useState(false);

  if (!isOpen) return null;

  const filterTasks = (tasks: ActionItem[]) => {
    return tasks.filter((task) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "content") return task.category === "content";
      if (activeFilter === "seo") return task.category === "seo";
      if (activeFilter === "experiments") return task.category === "experiment";
      if (activeFilter === "approvals") return task.category === "approval";
      if (activeFilter === "security") return task.category === "security";
      return true;
    });
  };

  const filteredTasks = filterTasks(mockTasks);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekFromNow = new Date(today);
  weekFromNow.setDate(weekFromNow.getDate() + 7);

  const overdueTasks = filteredTasks.filter((task) => new Date(task.dueDate) < today);
  const dueTodayTasks = filteredTasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate.toDateString() === today.toDateString();
  });
  const thisWeekTasks = filteredTasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate > today && dueDate <= weekFromNow;
  });
  const laterTasks = filteredTasks.filter((task) => new Date(task.dueDate) > weekFromNow);

  const unreadCount = mockTasks.filter((t) => !t.isRead).length;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[380px] bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="border-b">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-medium">Action Items</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex items-center border-b px-4">
            <button
              onClick={() => setActiveTab("my-tasks")}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "my-tasks"
                  ? "border-[#003087] text-[#003087]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              My Tasks ({mockTasks.length})
            </button>
            <button
              onClick={() => setActiveTab("assigned-by-me")}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "assigned-by-me"
                  ? "border-[#003087] text-[#003087]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Assigned by Me (7)
            </button>
            <button
              onClick={() => setActiveTab("all-network")}
              className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "all-network"
                  ? "border-[#003087] text-[#003087]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              All Network (34)
            </button>
          </div>

          <div className="flex items-center justify-end px-4 py-2">
            <button className="text-xs text-[#003087] hover:underline">
              Mark All Read
            </button>
          </div>

          {/* Filter Chips */}
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {(["all", "content", "seo", "experiments", "approvals", "security"] as FilterType[]).map(
              (filter) => (
                <Badge
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  className={`cursor-pointer capitalize ${
                    activeFilter === filter
                      ? "bg-[#003087] hover:bg-[#002866]"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === "all" ? "All" : filter}
                </Badge>
              )
            )}
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto">
          {/* Overdue */}
          {overdueTasks.length > 0 && (
            <div>
              <div className="bg-red-50 px-4 py-2 border-b border-red-100">
                <h3 className="text-sm font-medium text-red-900">
                  Overdue ({overdueTasks.length})
                </h3>
              </div>
              <div className="divide-y">
                {overdueTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isExpanded={expandedTask === task.id}
                    onToggleExpand={() =>
                      setExpandedTask(expandedTask === task.id ? null : task.id)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Due Today */}
          {dueTodayTasks.length > 0 && (
            <div>
              <div className="bg-amber-50 px-4 py-2 border-b border-amber-100">
                <h3 className="text-sm font-medium text-amber-900">
                  Due Today ({dueTodayTasks.length})
                </h3>
              </div>
              <div className="divide-y">
                {dueTodayTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isExpanded={expandedTask === task.id}
                    onToggleExpand={() =>
                      setExpandedTask(expandedTask === task.id ? null : task.id)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* This Week */}
          {thisWeekTasks.length > 0 && (
            <div>
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h3 className="text-sm font-medium">This Week ({thisWeekTasks.length})</h3>
              </div>
              <div className="divide-y">
                {thisWeekTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isExpanded={expandedTask === task.id}
                    onToggleExpand={() =>
                      setExpandedTask(expandedTask === task.id ? null : task.id)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Later (Collapsible) */}
          {laterTasks.length > 0 && (
            <div>
              <button
                onClick={() => setShowLater(!showLater)}
                className="w-full bg-gray-50 px-4 py-2 border-b flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-sm font-medium">Later ({laterTasks.length})</h3>
                {showLater ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              {showLater && (
                <div className="divide-y">
                  {laterTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isExpanded={expandedTask === task.id}
                      onToggleExpand={() =>
                        setExpandedTask(expandedTask === task.id ? null : task.id)
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Create */}
        <div className="border-t p-4">
          {!showQuickCreate ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowQuickCreate(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Action Item
            </Button>
          ) : (
            <QuickCreateTask onCancel={() => setShowQuickCreate(false)} />
          )}
        </div>
      </div>
    </>
  );
}
