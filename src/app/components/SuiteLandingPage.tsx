import { Network, GraduationCap, ImageIcon, Clock, ArrowRight } from "lucide-react";

export function SuiteLandingPage() {
  const apps = [
    {
      id: "network-manager",
      name: "Network Manager",
      icon: Network,
      subtitle: "Sites, publishing, experiments",
      lastVisited: "2 hours ago",
    },
    {
      id: "program-directory",
      name: "Program Directory",
      icon: GraduationCap,
      subtitle: "Academic programs & offerings",
      lastVisited: "Yesterday",
    },
    {
      id: "media-library",
      name: "Media Submission",
      icon: ImageIcon,
      subtitle: "Collect media from your community",
      lastVisited: "3 days ago",
    },
  ];

  const recentActivity = [
    {
      id: "1",
      app: "Network Manager",
      action: "Updated COVID-19 Policies page",
      site: "Student Services Portal",
      timestamp: "2h ago",
    },
    {
      id: "2",
      app: "Program Directory",
      action: "Published Alternative Certification program",
      site: "Academic Programs",
      timestamp: "5h ago",
    },
    {
      id: "3",
      app: "Network Manager",
      action: "Launched A/B test: Homepage Hero CTA",
      site: "COE Main",
      timestamp: "1d ago",
    },
  ];

  const recentItems = [
    { type: "Program", name: "Alternative Certification", app: "Program Directory" },
    { type: "Program", name: "Doctoral Studies in Education", app: "Program Directory" },
    { type: "Site", name: "COE Main - SEO Health", app: "Network Manager" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#003087] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">UF</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Welcome back, Eve</h1>
              <p className="text-muted-foreground">UF Education Suite</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* App Cards */}
        <div>
          <h2 className="text-lg font-medium mb-4">Your Apps</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  className="bg-white border rounded-lg p-6 hover:border-[#003087] hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#003087] rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-1">{app.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{app.subtitle}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Last visited {app.lastVisited}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity & Quick Jump */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="pb-3 border-b last:border-b-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{activity.app}</span>
                    <span>·</span>
                    <span>{activity.site}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Jump */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-medium mb-4">Quick Jump</h3>
            <div className="space-y-2">
              {recentItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.type} · {item.app}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
