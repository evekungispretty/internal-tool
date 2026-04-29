import { Badge } from "./ui/badge";
import { AlertTriangle, Flag, GitBranch } from "lucide-react";

export function FlagHealthBar() {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="font-medium mb-4">Flag Health</h3>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Flag className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Active Flags</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-700">4</p>
            <p className="text-sm text-muted-foreground">Stale Flags (&gt;90 days)</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <GitBranch className="h-5 w-5 text-red-700" />
          </div>
          <div>
            <p className="text-2xl font-bold text-red-700">1</p>
            <p className="text-sm text-muted-foreground">Conflicting Rules</p>
          </div>
        </div>
      </div>
    </div>
  );
}
