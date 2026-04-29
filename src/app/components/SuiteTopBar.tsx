import { useState } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AppSwitcher } from "./AppSwitcher";
import { SidebarTrigger } from "./ui/sidebar";

interface SuiteTopBarProps {
  currentApp: string;
  breadcrumb?: string;
  onOpenActionDrawer: () => void;
  onNavigate?: (viewId: string) => void;
}

export function SuiteTopBar({ currentApp, breadcrumb, onOpenActionDrawer, onNavigate }: SuiteTopBarProps) {
  const [showAppSwitcher, setShowAppSwitcher] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="border-b bg-white sticky top-0 z-10">
      <div className="flex h-16 items-center gap-4 px-6">
        {/* Left: Logo + App Switcher */}
        <div className="flex items-center gap-3">
          <SidebarTrigger />

          {/* UF Shield Logo + Wordmark */}
          <div className="flex items-center gap-2 border-r pr-4">
            <div className="w-8 h-8 bg-[#003087] rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">UF</span>
            </div>
            <span className="font-medium text-sm whitespace-nowrap">UF Education Suite</span>
          </div>

          {/* App Switcher Button */}
          <div className="relative">
            <button
              onClick={() => setShowAppSwitcher(!showAppSwitcher)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="App Switcher"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="text-muted-foreground"
              >
                <circle cx="4" cy="4" r="1.5" fill="currentColor" />
                <circle cx="10" cy="4" r="1.5" fill="currentColor" />
                <circle cx="16" cy="4" r="1.5" fill="currentColor" />
                <circle cx="4" cy="10" r="1.5" fill="currentColor" />
                <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                <circle cx="16" cy="10" r="1.5" fill="currentColor" />
                <circle cx="4" cy="16" r="1.5" fill="currentColor" />
                <circle cx="10" cy="16" r="1.5" fill="currentColor" />
                <circle cx="16" cy="16" r="1.5" fill="currentColor" />
              </svg>
            </button>

            {showAppSwitcher && (
              <AppSwitcher
                onClose={() => setShowAppSwitcher(false)}
                onNavigate={onNavigate}
              />
            )}
          </div>
        </div>

        {/* Center: App Name + Breadcrumb */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">{currentApp}</span>
            {breadcrumb && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground truncate">{breadcrumb}</span>
              </>
            )}
          </div>
        </div>

        {/* Right: Search + Notifications + User */}
        <div className="flex items-center gap-4">
          {/* Global Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search across all apps..."
              className="pl-9 h-9"
            />
          </div>

          {/* Bell Icon */}
          <button
            onClick={onOpenActionDrawer}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              4
            </span>
          </button>

          {/* User Avatar + Role */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#003087] text-white flex items-center justify-center font-medium text-sm">
                EJ
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Eve Johnson</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border rounded-lg shadow-lg z-30">
                  <div className="p-2 space-y-1">
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
                      Profile Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded">
                      Suite Settings
                    </button>
                    <div className="border-t my-1" />
                    <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded text-red-600">
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
