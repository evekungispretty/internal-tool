import { Switch } from "./ui/switch";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Role } from "./RolesPermissions";
import { useState } from "react";

interface PermissionMatrixProps {
  role: Role;
}

interface PermissionGroup {
  name: string;
  permissions: {
    label: string;
    key: string;
    enabled: boolean;
  }[];
}

// Role ID mapping:
// 1: Network Admin, 2: Site Manager, 3: Content Editor
// 4: SEO Specialist, 5: Developer, 6: Viewer

const getPermissionsForRole = (roleId: string): PermissionGroup[] => {
  const basePermissions = {
    content_publish: false,
    content_edit: false,
    content_delete: false,
    content_approve: false,
    content_schedule: false,
    sites_view: false,
    sites_manage: false,
    sites_create: false,
    sites_archive: false,
    experiments_view: false,
    experiments_create: false,
    experiments_launch: false,
    experiments_winner: false,
    analytics_view: false,
    analytics_export: false,
    seo_audit: false,
    seo_keywords: false,
    seo_resolve: false,
    governance_audit: false,
    governance_reports: false,
    governance_resolve: false,
    mgmt_users: false,
    mgmt_roles: false,
    mgmt_plugins: false,
    mgmt_backups: false,
    billing_view: false,
    billing_edit: false,
  };

  // Network Admin - Full access
  if (roleId === "1") {
    Object.keys(basePermissions).forEach((key) => {
      basePermissions[key as keyof typeof basePermissions] = true;
    });
  }

  // Site Manager - Manage sites, content, users
  if (roleId === "2") {
    basePermissions.content_publish = true;
    basePermissions.content_edit = true;
    basePermissions.content_delete = true;
    basePermissions.content_approve = true;
    basePermissions.content_schedule = true;
    basePermissions.sites_view = true;
    basePermissions.sites_manage = true;
    basePermissions.experiments_view = true;
    basePermissions.experiments_create = true;
    basePermissions.experiments_launch = true;
    basePermissions.analytics_view = true;
    basePermissions.analytics_export = true;
    basePermissions.seo_audit = true;
    basePermissions.seo_keywords = true;
    basePermissions.governance_reports = true;
    basePermissions.mgmt_users = true;
  }

  // Content Editor - Edit/publish content only
  if (roleId === "3") {
    basePermissions.content_publish = true;
    basePermissions.content_edit = true;
    basePermissions.content_schedule = true;
    basePermissions.sites_view = true;
    basePermissions.analytics_view = true;
  }

  // SEO Specialist - SEO and analytics, no management
  if (roleId === "4") {
    basePermissions.sites_view = true;
    basePermissions.analytics_view = true;
    basePermissions.analytics_export = true;
    basePermissions.seo_audit = true;
    basePermissions.seo_keywords = true;
    basePermissions.seo_resolve = true;
    basePermissions.governance_audit = true;
    basePermissions.governance_reports = true;
    basePermissions.governance_resolve = true;
  }

  // Developer - Technical settings, themes, plugins
  if (roleId === "5") {
    basePermissions.sites_view = true;
    basePermissions.sites_manage = true;
    basePermissions.analytics_view = true;
    basePermissions.governance_audit = true;
    basePermissions.governance_reports = true;
    basePermissions.mgmt_plugins = true;
    basePermissions.mgmt_backups = true;
  }

  // Viewer - Read-only
  if (roleId === "6") {
    basePermissions.sites_view = true;
    basePermissions.analytics_view = true;
    basePermissions.governance_reports = true;
  }

  return [
    {
      name: "Content",
      permissions: [
        { label: "Publish", key: "content_publish", enabled: basePermissions.content_publish },
        { label: "Edit", key: "content_edit", enabled: basePermissions.content_edit },
        { label: "Delete", key: "content_delete", enabled: basePermissions.content_delete },
        { label: "Approve", key: "content_approve", enabled: basePermissions.content_approve },
        { label: "Schedule", key: "content_schedule", enabled: basePermissions.content_schedule },
      ],
    },
    {
      name: "Sites",
      permissions: [
        { label: "View", key: "sites_view", enabled: basePermissions.sites_view },
        { label: "Manage", key: "sites_manage", enabled: basePermissions.sites_manage },
        { label: "Create", key: "sites_create", enabled: basePermissions.sites_create },
        { label: "Archive", key: "sites_archive", enabled: basePermissions.sites_archive },
      ],
    },
    {
      name: "Experiments",
      permissions: [
        { label: "View Results", key: "experiments_view", enabled: basePermissions.experiments_view },
        { label: "Create Tests", key: "experiments_create", enabled: basePermissions.experiments_create },
        { label: "Launch", key: "experiments_launch", enabled: basePermissions.experiments_launch },
        { label: "Declare Winner", key: "experiments_winner", enabled: basePermissions.experiments_winner },
      ],
    },
    {
      name: "Analytics",
      permissions: [
        { label: "View", key: "analytics_view", enabled: basePermissions.analytics_view },
        { label: "Export", key: "analytics_export", enabled: basePermissions.analytics_export },
      ],
    },
    {
      name: "SEO",
      permissions: [
        { label: "Run SEO Audit", key: "seo_audit", enabled: basePermissions.seo_audit },
        { label: "Manage Keywords", key: "seo_keywords", enabled: basePermissions.seo_keywords },
        { label: "Resolve Issues", key: "seo_resolve", enabled: basePermissions.seo_resolve },
      ],
    },
    {
      name: "Governance",
      permissions: [
        { label: "Run Audit", key: "governance_audit", enabled: basePermissions.governance_audit },
        { label: "View Reports", key: "governance_reports", enabled: basePermissions.governance_reports },
        { label: "Resolve Issues", key: "governance_resolve", enabled: basePermissions.governance_resolve },
      ],
    },
    {
      name: "Management",
      permissions: [
        { label: "Manage Users", key: "mgmt_users", enabled: basePermissions.mgmt_users },
        { label: "Manage Roles", key: "mgmt_roles", enabled: basePermissions.mgmt_roles },
        { label: "Manage Plugins", key: "mgmt_plugins", enabled: basePermissions.mgmt_plugins },
        { label: "Backups", key: "mgmt_backups", enabled: basePermissions.mgmt_backups },
      ],
    },
    {
      name: "Billing",
      permissions: [
        { label: "View", key: "billing_view", enabled: basePermissions.billing_view },
        { label: "Edit", key: "billing_edit", enabled: basePermissions.billing_edit },
      ],
    },
  ];
};

export function PermissionMatrix({ role }: PermissionMatrixProps) {
  const permissionGroups = getPermissionsForRole(role.id);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    permissionGroups.map((g) => g.name)
  );

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((g) => g !== groupName)
        : [...prev, groupName]
    );
  };

  const totalEnabled = permissionGroups.reduce(
    (acc, group) => acc + group.permissions.filter((p) => p.enabled).length,
    0
  );
  const totalPermissions = permissionGroups.reduce(
    (acc, group) => acc + group.permissions.length,
    0
  );

  return (
    <div className="bg-white border rounded-lg">
      <div className="p-6 border-b">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">Permissions for {role.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure what this role can access and modify
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#003087]">{totalEnabled}</p>
            <p className="text-xs text-muted-foreground">
              of {totalPermissions} enabled
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y">
        {permissionGroups.map((group) => {
          const isExpanded = expandedGroups.includes(group.name);

          return (
            <div key={group.name}>
              <button
                onClick={() => toggleGroup(group.name)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-medium">{group.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({group.permissions.filter((p) => p.enabled).length}/
                    {group.permissions.length})
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.permissions.map((permission) => (
                    <div
                      key={permission.key}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <label
                        htmlFor={permission.key}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {permission.label}
                      </label>
                      <Switch
                        id={permission.key}
                        checked={permission.enabled}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
