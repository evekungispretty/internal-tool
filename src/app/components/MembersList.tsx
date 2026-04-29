import { Button } from "./ui/button";
import { UserPlus, UserMinus, Mail, Shield } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { User } from "./RolesPermissions";
import { ActionMenu } from "./ActionMenu";

interface MembersListProps {
  members: User[];
  onUserClick: (user: User) => void;
  onAddMember?: () => void;
}

export function MembersList({ members, onUserClick, onAddMember }: MembersListProps) {
  return (
    <div className="bg-white border rounded-lg">
      <div className="p-6 border-b">
        <h3 className="font-medium">Members in this Role</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {members.length} {members.length === 1 ? "member" : "members"} assigned to this role
        </p>
      </div>

      <div className="divide-y">
        {members.map((member) => (
          <div
            key={member.id}
            className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
          >
            <button
              onClick={() => onUserClick(member)}
              className="flex items-center gap-3 flex-1 min-w-0 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-[#003087] text-white flex items-center justify-center font-medium flex-shrink-0">
                {member.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{member.name}</p>
                <p className="text-sm text-muted-foreground truncate">{member.email}</p>
              </div>
            </button>

            <Select defaultValue={member.siteScope}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="specific">Specific Sites</SelectItem>
              </SelectContent>
            </Select>

            <ActionMenu
              size="sm"
              items={[
                {
                  label: "Change Role",
                  icon: <Shield className="h-4 w-4" />,
                  onClick: () => console.log("Change role"),
                },
                {
                  label: "Send Email",
                  icon: <Mail className="h-4 w-4" />,
                  onClick: () => console.log("Send email"),
                  divider: true,
                },
                {
                  label: "Remove from Role",
                  icon: <UserMinus className="h-4 w-4" />,
                  onClick: () => console.log("Remove"),
                  variant: "danger",
                },
              ]}
            />
          </div>
        ))}

        {/* Add Member Button */}
        <button
          onClick={onAddMember}
          className="w-full p-4 flex items-center justify-center gap-2 text-[#003087] hover:bg-blue-50 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          <span className="font-medium">Add Member to Role</span>
        </button>
      </div>
    </div>
  );
}
