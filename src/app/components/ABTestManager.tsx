import { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { ExperimentCard } from "./ExperimentCard";
import { ExperimentDetailPanel } from "./ExperimentDetailPanel";
import { CreateExperiment } from "./CreateExperiment";

export interface Experiment {
  id: string;
  name: string;
  siteName: string;
  contentType: "Layout" | "Copy" | "Feature";
  status: "running" | "scheduled" | "completed" | "archived";
  controlRate: number;
  variantRate: number;
  controlSessions: number;
  variantSessions: number;
  confidence: number;
  trafficSplit: { control: number; variant: number };
  startDate: string;
  endDate: string;
  winner?: "control" | "variant";
  lift?: number;
}

const mockExperiments: Experiment[] = [
  {
    id: "1",
    name: "Homepage Hero CTA Button",
    siteName: "COE Main",
    contentType: "Copy",
    status: "running",
    controlRate: 12.3,
    variantRate: 14.0,
    controlSessions: 4521,
    variantSessions: 4498,
    confidence: 87,
    trafficSplit: { control: 50, variant: 50 },
    startDate: "2026-04-15",
    endDate: "2026-05-15",
    winner: "variant",
    lift: 14,
  },
  {
    id: "2",
    name: "Faculty Directory Search Layout",
    siteName: "Faculty Portal",
    contentType: "Layout",
    status: "running",
    controlRate: 8.5,
    variantRate: 8.9,
    controlSessions: 2103,
    variantSessions: 2087,
    confidence: 42,
    trafficSplit: { control: 50, variant: 50 },
    startDate: "2026-04-20",
    endDate: "2026-05-20",
  },
  {
    id: "3",
    name: "Alumni Newsletter Signup Form",
    siteName: "Alumni Portal",
    contentType: "Feature",
    status: "running",
    controlRate: 15.2,
    variantRate: 14.8,
    controlSessions: 1876,
    variantSessions: 1891,
    confidence: 28,
    trafficSplit: { control: 50, variant: 50 },
    startDate: "2026-04-22",
    endDate: "2026-05-22",
  },
  {
    id: "4",
    name: "Course Catalog Filter Options",
    siteName: "Academic Programs",
    contentType: "Feature",
    status: "scheduled",
    controlRate: 0,
    variantRate: 0,
    controlSessions: 0,
    variantSessions: 0,
    confidence: 0,
    trafficSplit: { control: 50, variant: 50 },
    startDate: "2026-05-01",
    endDate: "2026-06-01",
  },
  {
    id: "5",
    name: "Research Grant Application CTA",
    siteName: "Research Portal",
    contentType: "Copy",
    status: "scheduled",
    controlRate: 0,
    variantRate: 0,
    controlSessions: 0,
    variantSessions: 0,
    confidence: 0,
    trafficSplit: { control: 50, variant: 50 },
    startDate: "2026-05-05",
    endDate: "2026-06-05",
  },
  {
    id: "6",
    name: "Event Registration Page Layout",
    siteName: "Events",
    contentType: "Layout",
    status: "completed",
    controlRate: 18.7,
    variantRate: 22.1,
    controlSessions: 5432,
    variantSessions: 5401,
    confidence: 95,
    trafficSplit: { control: 50, variant: 50 },
    startDate: "2026-03-01",
    endDate: "2026-04-01",
    winner: "variant",
    lift: 18,
  },
];

type StatusFilter = "all" | "running" | "scheduled" | "completed" | "archived";

export function ABTestManager() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [expandedExperiment, setExpandedExperiment] = useState<string | null>("1");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredExperiments = mockExperiments.filter((exp) =>
    statusFilter === "all" ? true : exp.status === statusFilter
  );

  const statusCounts = {
    running: mockExperiments.filter((e) => e.status === "running").length,
    scheduled: mockExperiments.filter((e) => e.status === "scheduled").length,
    completed: mockExperiments.filter((e) => e.status === "completed").length,
    archived: mockExperiments.filter((e) => e.status === "archived").length,
  };

  if (showCreateForm) {
    return <CreateExperiment onBack={() => setShowCreateForm(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2">Experiments</h1>
          <p className="text-muted-foreground">
            Run and analyze tests across your site network
          </p>
        </div>
        <Button
          className="bg-[#003087] hover:bg-[#002866]"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Experiment
        </Button>
      </div>

      {/* Status Filter Tabs */}
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
          onClick={() => setStatusFilter("running")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            statusFilter === "running"
              ? "border-[#003087] text-[#003087]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Running ({statusCounts.running})
        </button>
        <button
          onClick={() => setStatusFilter("scheduled")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            statusFilter === "scheduled"
              ? "border-[#003087] text-[#003087]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Scheduled ({statusCounts.scheduled})
        </button>
        <button
          onClick={() => setStatusFilter("completed")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            statusFilter === "completed"
              ? "border-[#003087] text-[#003087]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Completed ({statusCounts.completed})
        </button>
        <button
          onClick={() => setStatusFilter("archived")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            statusFilter === "archived"
              ? "border-[#003087] text-[#003087]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Archived ({statusCounts.archived})
        </button>
      </div>

      {/* Experiment Cards */}
      <div className="space-y-4">
        {filteredExperiments.map((experiment) => (
          <div key={experiment.id}>
            <ExperimentCard
              experiment={experiment}
              isExpanded={expandedExperiment === experiment.id}
              onToggleExpand={() =>
                setExpandedExperiment(
                  expandedExperiment === experiment.id ? null : experiment.id
                )
              }
            />
            {expandedExperiment === experiment.id && (
              <ExperimentDetailPanel experiment={experiment} />
            )}
          </div>
        ))}
      </div>

      {/* Empty State / Get Started */}
      <div className="border-2 border-dashed rounded-lg p-8">
        <div className="text-center max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-[#003087] flex items-center justify-center mx-auto">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium">Design your next experiment</h3>
          <p className="text-sm text-muted-foreground">
            Choose a page, define variants, set your success metric
          </p>
          <Button
            className="bg-[#003087] hover:bg-[#002866]"
            onClick={() => setShowCreateForm(true)}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
