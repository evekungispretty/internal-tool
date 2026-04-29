import { GraduationCap, User, Calendar, ImageIcon } from "lucide-react";

interface AppSwitcherShortcutProps {
  onNavigate?: (viewId: string) => void;
}

export function AppSwitcherShortcut({ onNavigate }: AppSwitcherShortcutProps) {
  const otherApps = [
    { id: "program-directory", icon: GraduationCap, name: "Program Directory" },
    { id: "faculty-directory", icon: User, name: "Faculty Directory", disabled: true },
    { id: "events-manager", icon: Calendar, name: "Events Manager", disabled: true },
    { id: "media-library", icon: ImageIcon, name: "Media Submission", disabled: false },
  ];

  return (
    <div className="border-t border-sidebar-border p-4">
      <p className="text-xs text-sidebar-foreground/70 mb-2">SWITCH APP</p>
      <div className="flex items-center gap-2">
        {otherApps.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              disabled={app.disabled}
              onClick={() => {
                if (!app.disabled && app.id === "media-library" && onNavigate) {
                  onNavigate("media-library");
                }
              }}
              className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                app.disabled
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-sidebar-accent"
              }`}
              title={app.name}
            >
              <Icon className="h-4 w-4 text-sidebar-foreground" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
