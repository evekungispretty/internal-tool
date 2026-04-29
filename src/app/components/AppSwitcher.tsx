import { Network, GraduationCap, User, Calendar, ArrowRight } from "lucide-react";

interface AppSwitcherProps {
  onClose: () => void;
  onNavigate?: (viewId: string) => void;
}

interface App {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  subtitle: string;
  isActive: boolean;
  isComingSoon: boolean;
}

const apps: App[] = [
  {
    id: "network-manager",
    name: "Network Manager",
    icon: Network,
    subtitle: "Sites, publishing, experiments",
    isActive: true,
    isComingSoon: false,
  },
  {
    id: "program-directory",
    name: "Program Directory",
    icon: GraduationCap,
    subtitle: "Academic programs & offerings",
    isActive: false,
    isComingSoon: false,
  },
  {
    id: "faculty-directory",
    name: "Faculty Directory",
    icon: User,
    subtitle: "Faculty profiles & research",
    isActive: false,
    isComingSoon: true,
  },
  {
    id: "events-manager",
    name: "Events Manager",
    icon: Calendar,
    subtitle: "Events across all sites",
    isActive: false,
    isComingSoon: true,
  },
];

export function AppSwitcher({ onClose, onNavigate }: AppSwitcherProps) {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-20" onClick={onClose} />

      {/* Dropdown Card */}
      <div className="absolute left-0 top-full mt-2 w-[280px] bg-white border rounded-lg shadow-xl z-30">
        <div className="p-3">
          <p className="text-xs font-medium text-muted-foreground mb-3 px-2">
            UF EDUCATION SUITE
          </p>

          {/* App Grid */}
          <div className="grid grid-cols-2 gap-2">
            {apps.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  disabled={app.isComingSoon}
                  onClick={() => {
                    if (!app.isComingSoon && onNavigate) {
                      onNavigate(app.id);
                      onClose();
                    }
                  }}
                  className={`p-3 rounded-lg text-left transition-all ${
                    app.isActive
                      ? "border-2 border-[#003087] bg-blue-50"
                      : app.isComingSoon
                      ? "opacity-50 cursor-not-allowed"
                      : "border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        app.isActive
                          ? "bg-[#003087] text-white"
                          : "bg-gray-100 text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {app.name}
                        {app.isComingSoon && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            (Soon)
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {app.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-2">
          <button className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 rounded flex items-center justify-between">
            <span>Manage Suite Settings</span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </>
  );
}
