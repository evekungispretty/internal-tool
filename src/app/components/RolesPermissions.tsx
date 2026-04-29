import { useState } from "react";
import { Button } from "./ui/button";
import { Plus, UserPlus } from "lucide-react";
import { RoleCard } from "./RoleCard";
import { PermissionMatrix } from "./PermissionMatrix";
import { MembersList } from "./MembersList";
import { UserDetailPanel } from "./UserDetailPanel";
import { AddMemberModal } from "./AddMemberModal";

export interface Role {
  id: string;
  name: string;
  memberCount: number;
  color: string;
  isCustom?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleId: string;
  siteScope: "all" | "specific";
  sites?: string[];
  joinedDate: string;
  recentActivity: {
    action: string;
    timestamp: string;
  }[];
}

const mockRoles: Role[] = [
  { id: "1", name: "Network Admin", memberCount: 6, color: "bg-red-100 text-red-700" },
  { id: "2", name: "Site Manager", memberCount: 12, color: "bg-blue-100 text-blue-700" },
  { id: "3", name: "Content Editor", memberCount: 23, color: "bg-green-100 text-green-700" },
  { id: "4", name: "SEO Specialist", memberCount: 4, color: "bg-purple-100 text-purple-700" },
  { id: "5", name: "Developer", memberCount: 8, color: "bg-orange-100 text-orange-700" },
  { id: "6", name: "Viewer", memberCount: 15, color: "bg-gray-100 text-gray-700" },
];

const mockUsers: User[] = [
  {
    id: "1",
    name: "Maya Johnson",
    email: "maya.johnson@ufl.edu",
    avatar: "MJ",
    roleId: "1",
    siteScope: "all",
    joinedDate: "2024-01-15",
    recentActivity: [
      { action: "Created new experiment on COE Main", timestamp: "2h ago" },
      { action: "Updated site permissions for Faculty Portal", timestamp: "5h ago" },
    ],
  },
  {
    id: "2",
    name: "Alex Chen",
    email: "alex.chen@ufl.edu",
    avatar: "AC",
    roleId: "1",
    siteScope: "specific",
    sites: ["COE Main", "Research Portal"],
    joinedDate: "2024-02-20",
    recentActivity: [
      { action: "Published content to 3 sites", timestamp: "1h ago" },
      { action: "Approved content submission", timestamp: "3h ago" },
    ],
  },
  {
    id: "3",
    name: "Jordan Smith",
    email: "jordan.smith@ufl.edu",
    avatar: "JS",
    roleId: "1",
    siteScope: "all",
    joinedDate: "2023-11-10",
    recentActivity: [
      { action: "Modified backup settings", timestamp: "4h ago" },
      { action: "Ran security audit", timestamp: "1d ago" },
    ],
  },
  {
    id: "4",
    name: "Taylor Davis",
    email: "taylor.davis@ufl.edu",
    avatar: "TD",
    roleId: "4",
    siteScope: "all",
    joinedDate: "2024-03-01",
    recentActivity: [
      { action: "Resolved 12 SEO issues on Research Portal", timestamp: "3h ago" },
      { action: "Ran SEO audit across all sites", timestamp: "1d ago" },
    ],
  },
  {
    id: "5",
    name: "Sam Williams",
    email: "sam.williams@ufl.edu",
    avatar: "SW",
    roleId: "4",
    siteScope: "specific",
    sites: ["COE Main", "Alumni Portal"],
    joinedDate: "2024-04-10",
    recentActivity: [
      { action: "Updated keyword targeting", timestamp: "1d ago" },
      { action: "Fixed broken links on COE Main", timestamp: "2d ago" },
    ],
  },
  {
    id: "6",
    name: "Chris Martinez",
    email: "chris.martinez@ufl.edu",
    avatar: "CM",
    roleId: "3",
    siteScope: "specific",
    sites: ["Research Portal"],
    joinedDate: "2024-02-15",
    recentActivity: [
      { action: "Published 5 articles", timestamp: "4h ago" },
      { action: "Scheduled content for next week", timestamp: "1d ago" },
    ],
  },
];

export function RolesPermissions() {
  const [selectedRole, setSelectedRole] = useState<string>("1");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [addMemberToRole, setAddMemberToRole] = useState<string | undefined>(undefined);

  const currentRole = mockRoles.find((r) => r.id === selectedRole);
  const roleMembers = mockUsers.filter((u) => u.roleId === selectedRole);

  const handleAddMember = (roleId?: string) => {
    setAddMemberToRole(roleId);
    setShowAddMemberModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-2">Roles & Permissions</h1>
          <p className="text-muted-foreground">
            Manage team access across your network
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Role
          </Button>
          <Button
            className="bg-[#003087] hover:bg-[#002866]"
            onClick={() => handleAddMember()}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Roles Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-3">
          {mockRoles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              isSelected={selectedRole === role.id}
              onClick={() => setSelectedRole(role.id)}
            />
          ))}

          {/* Custom Role Card */}
          <button className="w-full border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Plus className="h-5 w-5" />
              <span className="font-medium">Create Custom Role</span>
            </div>
          </button>
        </div>

        {/* Right Section - Permission Matrix & Members */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {currentRole && (
            <>
              <PermissionMatrix role={currentRole} />
              <MembersList
                members={roleMembers}
                onUserClick={setSelectedUser}
                onAddMember={() => handleAddMember(selectedRole)}
              />
            </>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <AddMemberModal
          onClose={() => {
            setShowAddMemberModal(false);
            setAddMemberToRole(undefined);
          }}
          preselectedRoleId={addMemberToRole}
          roles={mockRoles}
        />
      )}

      {/* User Detail Panel */}
      {selectedUser && (
        <UserDetailPanel
          user={selectedUser}
          role={currentRole!}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
