import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SubmissionCard } from "./SubmissionCard";
import { SubmissionDetailDrawer } from "./SubmissionDetailDrawer";
import { BulkActionBar } from "./BulkActionBar";

export interface MediaSubmission {
  id: string;
  title: string;
  submitterName: string;
  submitterEmail: string;
  submissionDate: string;
  category: string;
  fileCount: number;
  fileType: "image" | "video";
  thumbnailUrl: string;
  files: {
    name: string;
    size: string;
    type: string;
    url: string;
  }[];
  source: "Web Form" | "API";
  formName: string;
  status: "new" | "reviewed" | "approved" | "rejected";
  notes?: string;
}

interface SubmissionsGalleryProps {
  selectedItems: string[];
  onSelectionChange: (items: string[]) => void;
}

const mockSubmissions: MediaSubmission[] = [
  {
    id: "1",
    title: "Graduate Student Research Showcase",
    submitterName: "Dr. Sarah Martinez",
    submitterEmail: "s.martinez@ufl.edu",
    submissionDate: "2026-04-25",
    category: "Research Events",
    fileCount: 3,
    fileType: "image",
    thumbnailUrl: "#",
    files: [
      { name: "showcase-1.jpg", size: "2.4 MB", type: "JPG", url: "#" },
      { name: "showcase-2.jpg", size: "1.8 MB", type: "JPG", url: "#" },
      { name: "showcase-3.jpg", size: "2.1 MB", type: "JPG", url: "#" },
    ],
    source: "Web Form",
    formName: "Spring 2025 Campus Photo Drive",
    status: "new",
  },
  {
    id: "2",
    title: "Faculty Welcome Video 2026",
    submitterName: "Maya Johnson",
    submitterEmail: "maya.j@ufl.edu",
    submissionDate: "2026-04-23",
    category: "Faculty Resources",
    fileCount: 1,
    fileType: "video",
    thumbnailUrl: "#",
    files: [{ name: "welcome-video.mp4", size: "45.2 MB", type: "MP4", url: "#" }],
    source: "API",
    formName: "Faculty Research Highlights",
    status: "approved",
  },
  {
    id: "3",
    title: "Campus Life Photos - Spring 2026",
    submitterName: "Alex Chen",
    submitterEmail: "a.chen@ufl.edu",
    submissionDate: "2026-04-20",
    category: "Student Life",
    fileCount: 5,
    fileType: "image",
    thumbnailUrl: "#",
    files: [
      { name: "campus-1.jpg", size: "3.2 MB", type: "JPG", url: "#" },
      { name: "campus-2.jpg", size: "2.9 MB", type: "JPG", url: "#" },
      { name: "campus-3.jpg", size: "3.5 MB", type: "JPG", url: "#" },
      { name: "campus-4.jpg", size: "2.7 MB", type: "JPG", url: "#" },
      { name: "campus-5.jpg", size: "3.1 MB", type: "JPG", url: "#" },
    ],
    source: "Web Form",
    formName: "Spring 2025 Campus Photo Drive",
    status: "reviewed",
  },
  {
    id: "4",
    title: "Alumni Event Highlights",
    submitterName: "Jordan Smith",
    submitterEmail: "jordan.s@ufl.edu",
    submissionDate: "2026-04-18",
    category: "Alumni Relations",
    fileCount: 2,
    fileType: "video",
    thumbnailUrl: "#",
    files: [
      { name: "alumni-event-1.mp4", size: "32.1 MB", type: "MP4", url: "#" },
      { name: "alumni-event-2.mov", size: "28.5 MB", type: "MOV", url: "#" },
    ],
    source: "Web Form",
    formName: "Alumni Event Photos",
    status: "rejected",
  },
];

export function SubmissionsGallery({ selectedItems, onSelectionChange }: SubmissionsGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFileType, setSelectedFileType] = useState("all");
  const [selectedSite, setSelectedSite] = useState("all");
  const [selectedForm, setSelectedForm] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<MediaSubmission | null>(null);

  const filteredSubmissions = mockSubmissions.filter((submission) => {
    const matchesCategory = selectedCategory === "all" || submission.category === selectedCategory;
    const matchesFileType =
      selectedFileType === "all" || submission.fileType === selectedFileType;
    const matchesForm = selectedForm === "all" || submission.formName === selectedForm;
    const matchesStatus = selectedStatus === "all" || submission.status === selectedStatus;
    const matchesSearch =
      searchQuery === "" ||
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.submitterName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesFileType && matchesForm && matchesStatus && matchesSearch;
  });

  const toggleSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      onSelectionChange(selectedItems.filter((item) => item !== id));
    } else {
      onSelectionChange([...selectedItems, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={selectedForm} onValueChange={setSelectedForm}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="All Forms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Forms</SelectItem>
            <SelectItem value="Spring 2025 Campus Photo Drive">Spring 2025 Campus Photo Drive</SelectItem>
            <SelectItem value="Faculty Research Highlights">Faculty Research Highlights</SelectItem>
            <SelectItem value="Alumni Event Photos">Alumni Event Photos</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Research Events">Research Events</SelectItem>
            <SelectItem value="Faculty Resources">Faculty Resources</SelectItem>
            <SelectItem value="Student Life">Student Life</SelectItem>
            <SelectItem value="Alumni Relations">Alumni Relations</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => setSelectedFileType("all")}
            className={`px-4 py-2 text-sm ${
              selectedFileType === "all" ? "bg-gray-100" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedFileType("image")}
            className={`px-4 py-2 text-sm border-x ${
              selectedFileType === "image" ? "bg-gray-100" : ""
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setSelectedFileType("video")}
            className={`px-4 py-2 text-sm ${
              selectedFileType === "video" ? "bg-gray-100" : ""
            }`}
          >
            Videos
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Input type="date" className="w-[140px]" />
          <span className="text-muted-foreground">to</span>
          <Input type="date" className="w-[140px]" />
        </div>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {filteredSubmissions.map((submission) => (
          <SubmissionCard
            key={submission.id}
            submission={submission}
            isSelected={selectedItems.includes(submission.id)}
            onToggleSelect={() => toggleSelection(submission.id)}
            onClick={() => setSelectedSubmission(submission)}
          />
        ))}
      </div>

      {/* Bulk Action Bar */}
      {selectedItems.length > 0 && (
        <BulkActionBar
          selectedCount={selectedItems.length}
          onClearSelection={() => onSelectionChange([])}
        />
      )}

      {/* Detail Drawer */}
      {selectedSubmission && (
        <SubmissionDetailDrawer
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button className="px-3 py-2 text-sm border rounded hover:bg-gray-100">
          Previous
        </button>
        <button className="px-3 py-2 text-sm bg-[#003087] text-white rounded">1</button>
        <button className="px-3 py-2 text-sm border rounded hover:bg-gray-100">2</button>
        <button className="px-3 py-2 text-sm border rounded hover:bg-gray-100">3</button>
        <button className="px-3 py-2 text-sm border rounded hover:bg-gray-100">
          Next
        </button>
      </div>
    </div>
  );
}
