import { GraduationCap, Network, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface CrossLinkCardProps {
  sourceApp: "network-manager" | "program-directory";
  title: string;
  links: {
    label: string;
    url: string;
  }[];
}

export function CrossLinkCard({ sourceApp, title, links }: CrossLinkCardProps) {
  const config = {
    "network-manager": {
      icon: Network,
      name: "Network Manager",
      color: "bg-blue-100 text-blue-700",
    },
    "program-directory": {
      icon: GraduationCap,
      name: "Program Directory",
      color: "bg-purple-100 text-purple-700",
    },
  };

  const appConfig = config[sourceApp];
  const Icon = appConfig.icon;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg ${appConfig.color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium mb-1">{title}</p>
          <div className="flex flex-wrap gap-2">
            {links.map((link, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-[#003087] hover:text-[#002866] hover:bg-blue-100"
              >
                {link.label}
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
