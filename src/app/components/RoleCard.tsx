import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Copy, Trash2 } from "lucide-react";
import { Role } from "./RolesPermissions";
import { useState } from "react";

interface RoleCardProps {
  role: Role;
  isSelected: boolean;
  onClick: () => void;
}

export function RoleCard({ role, isSelected, onClick }: RoleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full border rounded-lg p-4 text-left transition-all ${
        isSelected
          ? "border-[#003087] bg-blue-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium">{role.name}</h3>
        <Badge variant="secondary" className={role.color}>
          {role.memberCount}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        {role.memberCount} {role.memberCount === 1 ? "member" : "members"}
      </p>

      {/* Actions on Hover */}
      {isHovered && !role.isCustom && (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Copy className="h-3 w-3 mr-1" />
            Duplicate
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-red-600 hover:text-red-700"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      )}
    </button>
  );
}
