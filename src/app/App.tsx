import { useState } from "react";
import {
  LayoutDashboard,
  Globe,
  BarChart3,
  Calendar,
  FlaskConical,
  Flag,
  BarChart2,
  Search,
  Eye,
  FileText as FileTextIcon,
  Users,
  Palette,
  Zap,
  Plug,
  Settings,
  BookOpen,
  CheckCircle2,
  ImageIcon,
  GraduationCap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { DashboardOverview } from "./components/DashboardOverview";
import { SitesTable } from "./components/SitesTable";
import { AnalyticsChart } from "./components/AnalyticsChart";
import { SiteHealth } from "./components/SiteHealth";
import { ThemesPlugins } from "./components/ThemesPlugins";
import { Documentation } from "./components/Documentation";
import { ContentReview } from "./components/ContentReview";
import { ContentPipeline } from "./components/ContentPipeline";
import { ExperimentPerformance } from "./components/ExperimentPerformance";
import { RecentActivity } from "./components/RecentActivity";
import { GovernanceAlerts } from "./components/GovernanceAlerts";
import { EditorialCalendar } from "./components/EditorialCalendar";
import { ABTestManager } from "./components/ABTestManager";
import { RolesPermissions } from "./components/RolesPermissions";
import { FeatureFlags } from "./components/FeatureFlags";
import { SEOHealth } from "./components/SEOHealth";
import { ActionItemsDrawer } from "./components/ActionItemsDrawer";
import { SuiteTopBar } from "./components/SuiteTopBar";
import { AppSwitcherShortcut } from "./components/AppSwitcherShortcut";
import { SuiteLandingPage } from "./components/SuiteLandingPage";
import { MediaLibrary } from "./components/MediaLibrary";
import { ProgramDirectoryTool } from "./components/ProgramDirectoryTool";

const navigationItems = [
  {
    title: "Main",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
      { title: "Sites", icon: Globe, id: "sites" },
      { title: "Analytics", icon: BarChart3, id: "analytics" },
    ],
  },
  {
    title: "Publish",
    items: [
      { title: "Editorial Calendar", icon: Calendar, id: "calendar" },
      { title: "Content Review", icon: CheckCircle2, id: "content-review" },
    ],
  },
  {
    title: "Experiments",
    items: [
      { title: "A/B Tests", icon: FlaskConical, id: "ab-tests" },
      { title: "Feature Flags", icon: Flag, id: "feature-flags" },
      { title: "Results", icon: BarChart2, id: "results" },
    ],
  },
  {
    title: "Governance",
    items: [
      { title: "SEO Health", icon: Search, id: "seo" },
      { title: "Accessibility Audit", icon: Eye, id: "accessibility" },
      { title: "Activity Log", icon: FileTextIcon, id: "activity" },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "Roles & Permissions", icon: Users, id: "roles" },
      { title: "Themes & Plugins", icon: Palette, id: "themes" },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "Media Submission", icon: ImageIcon, id: "media-library" },
      { title: "Program Directory", icon: GraduationCap, id: "program-directory" },
      { title: "Performance", icon: Zap, id: "performance" },
      { title: "Documentation", icon: BookOpen, id: "docs" },
      { title: "Integrations", icon: Plug, id: "integrations" },
      { title: "Settings", icon: Settings, id: "settings" },
    ],
  },
];

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);

  // Get breadcrumb based on active view
  const getBreadcrumb = () => {
    switch (activeView) {
      case "dashboard":
        return "Dashboard";
      case "sites":
        return "Sites";
      case "analytics":
        return "Analytics";
      case "calendar":
        return "Editorial Calendar";
      case "content-review":
        return "Content Review";
      case "ab-tests":
        return "A/B Tests";
      case "feature-flags":
        return "Feature Flags";
      case "seo":
        return "SEO Health";
      case "roles":
        return "Roles & Permissions";
      case "themes":
        return "Themes & Plugins";
      case "media-library":
        return "Media Submission";
      case "program-directory":
        return "Program Directory";
      default:
        return "";
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Overview of your WordPress Network
              </p>
            </div>

            {/* Top row - 4 stat cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-lg border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Sites</p>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold">52</div>
                <p className="text-xs text-green-600 mt-1">+1 this month</p>
              </div>

              <div className="bg-white rounded-lg border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Visits</p>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold">987,654</div>
                <p className="text-xs text-green-600 mt-1">+12.5%</p>
              </div>

              <div className="bg-white rounded-lg border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold">8</div>
                <p className="text-xs text-amber-600 mt-1">needs review</p>
              </div>

              <div className="bg-white rounded-lg border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Active Experiments</p>
                  <FlaskConical className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-muted-foreground mt-1">running</p>
              </div>
            </div>

            {/* Second row - Content Pipeline and Experiment Performance */}
            <div className="grid gap-4 lg:grid-cols-2">
              <ContentPipeline onViewContentReview={() => setActiveView("content-review")} />
              <ExperimentPerformance />
            </div>

            {/* Third row - Recent Activity and Governance Alerts */}
            <div className="grid gap-4 lg:grid-cols-2">
              <RecentActivity />
              <GovernanceAlerts />
            </div>
          </div>
        );
      case "sites":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">Sites Management</h1>
              <p className="text-muted-foreground">
                Manage all sites in your WordPress Network
              </p>
            </div>
            <SitesTable />
          </div>
        );
      case "analytics":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">Analytics</h1>
              <p className="text-muted-foreground">
                Detailed analytics and visitor insights across all sites
              </p>
            </div>
            <AnalyticsChart />
            <DashboardOverview />
          </div>
        );
      case "health":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">Site Health</h1>
              <p className="text-muted-foreground">
                Monitor health status and issues across your network
              </p>
            </div>
            <SiteHealth />
          </div>
        );
      case "themes":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">Themes & Plugins</h1>
              <p className="text-muted-foreground">
                Manage themes and plugins across all sites
              </p>
            </div>
            <ThemesPlugins />
          </div>
        );
      case "content-review":
        return <ContentReview />;
      case "docs":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="mb-2">Documentation</h1>
              <p className="text-muted-foreground">
                Team documentation, Monday tickets, and Google Docs
              </p>
            </div>
            <Documentation />
          </div>
        );
      case "calendar":
        return <EditorialCalendar />;
      case "ab-tests":
        return <ABTestManager />;
      case "feature-flags":
        return <FeatureFlags />;
      case "roles":
        return <RolesPermissions />;
      case "seo":
        return <SEOHealth />;
      case "media-library":
        return <MediaLibrary />;
      case "program-directory":
        return <ProgramDirectoryTool />;
      default:
        return (
          <div className="flex h-[50vh] items-center justify-center">
            <div className="text-center space-y-2">
              <h2>Coming Soon</h2>
              <p className="text-muted-foreground">
                This feature is under development
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <div className="px-6 py-4 border-b border-sidebar-border">
              <h2 className="text-lg text-sidebar-foreground">UF College of Education</h2>
              <p className="text-xs text-sidebar-foreground/70">WordPress Network Manager</p>
            </div>
            {navigationItems.map((group) => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveView(item.id)}
                          isActive={activeView === item.id}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}

            {/* App Switcher Shortcut at bottom */}
            <AppSwitcherShortcut onNavigate={(viewId: string) => setActiveView(viewId)} />
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          <SuiteTopBar
            currentApp="Network Manager"
            breadcrumb={getBreadcrumb()}
            onOpenActionDrawer={() => setIsActionDrawerOpen(true)}
            onNavigate={(viewId: string) => setActiveView(viewId)}
          />
          <div className="p-6">
            {renderContent()}
          </div>
        </main>

        {/* Action Items Drawer */}
        <ActionItemsDrawer
          isOpen={isActionDrawerOpen}
          onClose={() => setIsActionDrawerOpen(false)}
        />
      </div>
    </SidebarProvider>
  );
}
