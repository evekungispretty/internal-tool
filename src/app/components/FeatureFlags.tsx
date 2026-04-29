import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Search } from "lucide-react";
import { FlagCard } from "./FlagCard";
import { ScheduledRollouts } from "./ScheduledRollouts";
import { FlagHealthBar } from "./FlagHealthBar";
import { NewFlagForm } from "./NewFlagForm";

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  environments: ("Production" | "Staging")[];
  category: "UI" | "Infra" | "Content";
  enabled: boolean;
  rolloutPercent: number;
  targetingRules: {
    condition: string;
    site: string;
    enabled: boolean;
  }[];
  createdBy: {
    name: string;
    avatar: string;
  };
  lastModified: string;
  isStale?: boolean;
}

const mockFlags: FeatureFlag[] = [
  {
    id: "1",
    name: "new_homepage_hero",
    description: "Updated hero section with new CTA design",
    environments: ["Production", "Staging"],
    category: "UI",
    enabled: true,
    rolloutPercent: 25,
    targetingRules: [
      {
        condition: "Site is education.ufl.edu/thrives",
        site: "education.ufl.edu/thrives",
        enabled: true,
      },
    ],
    createdBy: { name: "Maya Johnson", avatar: "MJ" },
    lastModified: "2h ago",
  },
  {
    id: "2",
    name: "analytics_v2_dashboard",
    description: "New analytics dashboard with enhanced visualizations",
    environments: ["Staging"],
    category: "UI",
    enabled: true,
    rolloutPercent: 50,
    targetingRules: [],
    createdBy: { name: "Alex Chen", avatar: "AC" },
    lastModified: "1d ago",
  },
  {
    id: "3",
    name: "cdn_migration",
    description: "Switch to new CDN infrastructure for better performance",
    environments: ["Production"],
    category: "Infra",
    enabled: true,
    rolloutPercent: 100,
    targetingRules: [],
    createdBy: { name: "Jordan Smith", avatar: "JS" },
    lastModified: "3d ago",
  },
  {
    id: "4",
    name: "legacy_editor_support",
    description: "Maintain support for classic WordPress editor",
    environments: ["Production"],
    category: "Content",
    enabled: false,
    rolloutPercent: 0,
    targetingRules: [],
    createdBy: { name: "Sam Williams", avatar: "SW" },
    lastModified: "120d ago",
    isStale: true,
  },
  {
    id: "5",
    name: "ai_content_suggestions",
    description: "AI-powered content recommendations for editors",
    environments: ["Staging"],
    category: "Content",
    enabled: true,
    rolloutPercent: 10,
    targetingRules: [],
    createdBy: { name: "Taylor Davis", avatar: "TD" },
    lastModified: "5h ago",
  },
];

type StatusFilter = "all" | "enabled" | "disabled" | "scheduled";

export function FeatureFlags() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewFlagForm, setShowNewFlagForm] = useState(false);

  const filteredFlags = mockFlags.filter((flag) => {
    const matchesSearch =
      searchQuery === "" ||
      flag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "enabled" && flag.enabled) ||
      (statusFilter === "disabled" && !flag.enabled) ||
      (statusFilter === "scheduled" && false); // No scheduled flags in mock data

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2">Feature Flags</h1>
          <p className="text-muted-foreground">
            Control feature rollouts across your network
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search flags..."
              className="pl-9 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            className="bg-[#003087] hover:bg-[#002866]"
            onClick={() => setShowNewFlagForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Flag
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            statusFilter === "all"
              ? "border-[#003087] text-[#003087]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setStatusFilter("enabled")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            statusFilter === "enabled"
              ? "border-[#003087] text-[#003087]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Enabled
        </button>
        <button
          onClick={() => setStatusFilter("disabled")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            statusFilter === "disabled"
              ? "border-[#003087] text-[#003087]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Disabled
        </button>
        <button
          onClick={() => setStatusFilter("scheduled")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            statusFilter === "scheduled"
              ? "border-[#003087] text-[#003087]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Scheduled
        </button>
      </div>

      {/* Scheduled Rollouts */}
      <ScheduledRollouts />

      {/* Flag Cards */}
      <div className="space-y-3">
        {filteredFlags.map((flag) => (
          <FlagCard key={flag.id} flag={flag} />
        ))}
      </div>

      {/* Flag Health Bar */}
      <FlagHealthBar />

      {/* New Flag Form */}
      {showNewFlagForm && (
        <NewFlagForm onClose={() => setShowNewFlagForm(false)} />
      )}
    </div>
  );
}
