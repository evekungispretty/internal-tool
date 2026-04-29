import { useState } from "react";
import { X, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";

interface AddMemberModalProps {
  onClose: () => void;
  preselectedRoleId?: string;
  roles: { id: string; name: string; color: string }[];
}

export function AddMemberModal({ onClose, preselectedRoleId, roles }: AddMemberModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState(preselectedRoleId || "");
  const [siteScope, setSiteScope] = useState<"all" | "specific">("all");
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [sendInviteEmail, setSendInviteEmail] = useState(true);

  const availableSites = [
    "COE Main",
    "Research Portal",
    "Alumni Portal",
    "Faculty Portal",
    "Academic Programs",
    "Student Services",
    "Events",
  ];

  const toggleSite = (site: string) => {
    if (selectedSites.includes(site)) {
      setSelectedSites(selectedSites.filter((s) => s !== site));
    } else {
      setSelectedSites([...selectedSites, site]);
    }
  };

  const selectedRoleInfo = roles.find((r) => r.id === selectedRole);

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] max-h-[90vh] bg-white rounded-lg shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Add Team Member</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Invite a new member to your network
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="colleague@ufl.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Assign Role <span className="text-red-500">*</span>
            </label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedRoleInfo && (
              <div className="flex items-center gap-2">
                <Badge className={selectedRoleInfo.color}>
                  {selectedRoleInfo.name}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  This role will determine their permissions
                </span>
              </div>
            )}
          </div>

          {/* Site Access Scope */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Site Access</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSiteScope("all")}
                className={`flex-1 p-3 border rounded-lg text-left transition-colors ${
                  siteScope === "all"
                    ? "border-[#003087] bg-[#003087]/5"
                    : "hover:border-gray-400"
                }`}
              >
                <div className="text-sm font-medium">All Sites</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Access to all 52 sites in the network
                </div>
              </button>
              <button
                onClick={() => setSiteScope("specific")}
                className={`flex-1 p-3 border rounded-lg text-left transition-colors ${
                  siteScope === "specific"
                    ? "border-[#003087] bg-[#003087]/5"
                    : "hover:border-gray-400"
                }`}
              >
                <div className="text-sm font-medium">Specific Sites</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Choose individual sites
                </div>
              </button>
            </div>
          </div>

          {/* Specific Sites Selection */}
          {siteScope === "specific" && (
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Select Sites ({selectedSites.length} selected)
              </label>
              <div className="border rounded-lg p-3 max-h-[200px] overflow-y-auto space-y-2">
                {availableSites.map((site) => (
                  <label
                    key={site}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSites.includes(site)}
                      onChange={() => toggleSite(site)}
                      className="w-4 h-4 rounded border-gray-300 text-[#003087] focus:ring-[#003087]"
                    />
                    <span className="text-sm">{site}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Send Invite Email */}
          <div className="border rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={sendInviteEmail}
                onChange={(e) => setSendInviteEmail(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#003087] focus:ring-[#003087] mt-0.5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Send invitation email</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  The member will receive an email with login instructions and their assigned role
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-[#003087] hover:bg-[#002866]"
            disabled={!email || !selectedRole}
          >
            Add Member
          </Button>
        </div>
      </div>
    </>
  );
}
