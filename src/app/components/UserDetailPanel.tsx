import { X, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { User, Role } from "./RolesPermissions";

interface UserDetailPanelProps {
  user: User;
  role: Role;
  onClose: () => void;
}

const allSites = [
  "COE Main",
  "Research Portal",
  "Alumni Portal",
  "Faculty Portal",
  "Academic Programs",
  "Student Services",
];

export function UserDetailPanel({ user, role, onClose }: UserDetailPanelProps) {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-[500px] bg-white border-l shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-medium">User Profile</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-[#003087] text-white flex items-center justify-center text-xl font-medium flex-shrink-0">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Joined {new Date(user.joinedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Role</label>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={role.color}>
                {role.name}
              </Badge>
              <Select defaultValue={role.id}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Network Admin</SelectItem>
                  <SelectItem value="2">Site Manager</SelectItem>
                  <SelectItem value="3">Content Editor</SelectItem>
                  <SelectItem value="4">SEO Specialist</SelectItem>
                  <SelectItem value="5">Developer</SelectItem>
                  <SelectItem value="6">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Site Access */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Site Access</label>
            <div className="border rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto">
              {allSites.map((site) => (
                <div key={site} className="flex items-center space-x-2">
                  <Checkbox
                    id={`site-${site}`}
                    defaultChecked={
                      user.siteScope === "all" ||
                      user.sites?.includes(site)
                    }
                  />
                  <label
                    htmlFor={`site-${site}`}
                    className="text-sm cursor-pointer"
                  >
                    {site}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {user.siteScope === "all"
                ? "This user has access to all sites"
                : `This user has access to ${user.sites?.length || 0} specific sites`}
            </p>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Recent Activity</label>
            <div className="space-y-3">
              {user.recentActivity.map((activity, index) => (
                <div key={index} className="flex gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t p-6 space-y-2">
          <Button className="w-full bg-[#003087] hover:bg-[#002866]">
            Save Changes
          </Button>
          <Button variant="ghost" className="w-full text-red-600 hover:text-red-700">
            Suspend Access
          </Button>
        </div>
      </div>
    </>
  );
}
