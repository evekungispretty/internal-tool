import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CalendarGrid } from "./CalendarGrid";
import { ContentDetailPanel } from "./ContentDetailPanel";
import { UnscheduledQueue } from "./UnscheduledQueue";
import { NewContentForm } from "./NewContentForm";
import { Badge } from "./ui/badge";

export interface ContentItem {
  id: string;
  title: string;
  siteName: string;
  status: "draft" | "in-review" | "scheduled" | "live";
  date?: string;
  assignee?: {
    name: string;
    avatar: string;
  };
  author?: string;
  daysSinceCreated?: number;
  approvalChain?: {
    stage: string;
    status: "completed" | "pending" | "waiting";
  }[];
  programId?: string;
  programName?: string;
}

const mockCalendarData: { [key: string]: ContentItem[] } = {
  "2026-04-01": [
    { id: "1", title: "New Graduate Programs Launch", siteName: "COE Main", status: "live", date: "2026-04-01", programId: "grad-program-1", programName: "Master of Education" },
  ],
  "2026-04-03": [
    { id: "2", title: "Faculty Research Spotlight", siteName: "Research Portal", status: "scheduled", date: "2026-04-03" },
    { id: "3", title: "Student Success Stories", siteName: "COE Main", status: "in-review", date: "2026-04-03" },
  ],
  "2026-04-07": [
    { id: "4", title: "Spring Semester Updates", siteName: "Academic Affairs", status: "scheduled", date: "2026-04-07" },
  ],
  "2026-04-10": [
    { id: "5", title: "Alumni Newsletter April", siteName: "Alumni Portal", status: "draft", date: "2026-04-10" },
    { id: "6", title: "Department News Roundup", siteName: "COE Main", status: "in-review", date: "2026-04-10" },
  ],
  "2026-04-15": [
    { id: "7", title: "Conference Registration Open", siteName: "Events", status: "scheduled", date: "2026-04-15" },
  ],
  "2026-04-22": [
    { id: "8", title: "Summer Course Catalog", siteName: "Academic Programs", status: "in-review", date: "2026-04-22" },
  ],
  "2026-04-28": [
    { id: "9", title: "Research Grant Opportunities", siteName: "Research Portal", status: "draft", date: "2026-04-28" },
  ],
};

const unscheduledContent: ContentItem[] = [
  { id: "u1", title: "Diversity & Inclusion Initiative Update", siteName: "COE Main", status: "draft", author: "Maya Johnson", daysSinceCreated: 3 },
  { id: "u2", title: "Technology in Education Webinar", siteName: "Professional Development", status: "draft", author: "Alex Chen", daysSinceCreated: 7 },
  { id: "u3", title: "Campus Safety Guidelines", siteName: "Student Services", status: "in-review", author: "Jordan Smith", daysSinceCreated: 2 },
  { id: "u4", title: "New Faculty Introductions", siteName: "COE Main", status: "draft", author: "Sam Williams", daysSinceCreated: 5 },
];

export function EditorialCalendar() {
  const [selectedView, setSelectedView] = useState<"month" | "week" | "list">("month");
  const [selectedSite, setSelectedSite] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1)); // April 2026
  const [showNewContentForm, setShowNewContentForm] = useState(false);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2">Editorial Calendar</h1>
          <p className="text-muted-foreground">
            Schedule and manage content across all 52 sites
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedSite} onValueChange={setSelectedSite}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Sites" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sites</SelectItem>
              <SelectItem value="coe-main">COE Main</SelectItem>
              <SelectItem value="research">Research Portal</SelectItem>
              <SelectItem value="alumni">Alumni Portal</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="post">Blog Post</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="event">Event</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center border rounded-lg">
            <Button
              variant={selectedView === "month" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedView("month")}
              className="rounded-r-none"
            >
              Month
            </Button>
            <Button
              variant={selectedView === "week" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedView("week")}
              className="rounded-none border-x"
            >
              Week
            </Button>
            <Button
              variant={selectedView === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedView("list")}
              className="rounded-l-none"
            >
              List
            </Button>
          </div>

          <Button
            className="bg-[#003087] hover:bg-[#002866]"
            onClick={() => setShowNewContentForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Content
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between bg-white border rounded-lg p-4">
        <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-medium">{monthName}</h2>
        <Button variant="ghost" size="sm" onClick={handleNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 min-h-0">
        <CalendarGrid
          currentMonth={currentMonth}
          calendarData={mockCalendarData}
          onContentClick={setSelectedContent}
        />
      </div>

      {/* Unscheduled Queue */}
      <UnscheduledQueue items={unscheduledContent} />

      {/* Content Detail Panel */}
      {selectedContent && (
        <ContentDetailPanel
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}

      {/* New Content Form */}
      {showNewContentForm && (
        <NewContentForm onClose={() => setShowNewContentForm(false)} />
      )}
    </div>
  );
}
