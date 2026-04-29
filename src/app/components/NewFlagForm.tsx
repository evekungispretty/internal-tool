import { useState } from "react";
import { X, Plus, Trash2, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface NewFlagFormProps {
  onClose: () => void;
}

interface TargetingRule {
  id: string;
  condition: string;
  value: string;
  enabled: boolean;
}

export function NewFlagForm({ onClose }: NewFlagFormProps) {
  const [flagName, setFlagName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"UI" | "Infra" | "Content">("UI");
  const [enabled, setEnabled] = useState(false);
  const [rolloutPercent, setRolloutPercent] = useState(0);
  const [environments, setEnvironments] = useState<string[]>(["Staging"]);
  const [targetingRules, setTargetingRules] = useState<TargetingRule[]>([]);
  const [scheduleRollout, setScheduleRollout] = useState(false);
  const [rolloutDate, setRolloutDate] = useState("");
  const [rolloutTime, setRolloutTime] = useState("09:00");

  const toggleEnvironment = (env: string) => {
    if (environments.includes(env)) {
      setEnvironments(environments.filter((e) => e !== env));
    } else {
      setEnvironments([...environments, env]);
    }
  };

  const addTargetingRule = () => {
    setTargetingRules([
      ...targetingRules,
      {
        id: `rule-${Date.now()}`,
        condition: "site",
        value: "",
        enabled: true,
      },
    ]);
  };

  const removeTargetingRule = (id: string) => {
    setTargetingRules(targetingRules.filter((rule) => rule.id !== id));
  };

  const updateTargetingRule = (id: string, field: string, value: string | boolean) => {
    setTargetingRules(
      targetingRules.map((rule) =>
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    );
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] max-h-[90vh] bg-white rounded-lg shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Create New Feature Flag</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Control feature rollouts with fine-grained targeting
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Flag Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Flag Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., new_homepage_hero"
              value={flagName}
              onChange={(e) => setFlagName(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
            />
            <p className="text-xs text-muted-foreground">
              Use lowercase with underscores (snake_case)
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="What does this flag control?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <div className="flex gap-2">
              {(["UI", "Infra", "Content"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    category === cat
                      ? "bg-[#003087] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Environments */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Environments</label>
            <div className="flex gap-2">
              {["Staging", "Production"].map((env) => (
                <button
                  key={env}
                  onClick={() => toggleEnvironment(env)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    environments.includes(env)
                      ? "bg-[#003087] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>

          {/* Rollout Settings */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Enable Flag</label>
                <p className="text-xs text-muted-foreground mt-1">
                  Turn this flag on immediately
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#003087]"></div>
              </label>
            </div>

            {enabled && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">
                      Rollout Percentage: {rolloutPercent}%
                    </label>
                    <Badge variant="secondary" className="text-xs">
                      {rolloutPercent === 0
                        ? "Disabled"
                        : rolloutPercent === 100
                        ? "Full Rollout"
                        : "Partial"}
                    </Badge>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={rolloutPercent}
                    onChange={(e) => setRolloutPercent(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003087]"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Targeting Rules */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Targeting Rules</label>
                <p className="text-xs text-muted-foreground">
                  Override rollout for specific conditions
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={addTargetingRule}>
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>

            {targetingRules.length > 0 && (
              <div className="space-y-2">
                {targetingRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                  >
                    <Select
                      value={rule.condition}
                      onValueChange={(value) =>
                        updateTargetingRule(rule.id, "condition", value)
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="site">Site is</SelectItem>
                        <SelectItem value="user">User is</SelectItem>
                        <SelectItem value="role">Role is</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Value..."
                      value={rule.value}
                      onChange={(e) =>
                        updateTargetingRule(rule.id, "value", e.target.value)
                      }
                      className="flex-1"
                    />
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={(e) =>
                          updateTargetingRule(rule.id, "enabled", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#003087]"></div>
                    </label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTargetingRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Schedule Rollout */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Schedule Rollout</label>
                <p className="text-xs text-muted-foreground mt-1">
                  Automatically enable this flag at a future date/time
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={scheduleRollout}
                  onChange={(e) => setScheduleRollout(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#003087]"></div>
              </label>
            </div>

            {scheduleRollout && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={rolloutDate}
                      onChange={(e) => setRolloutDate(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={rolloutTime}
                    onChange={(e) => setRolloutTime(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex items-center justify-between">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-[#003087] hover:bg-[#002866]">
            Create Flag
          </Button>
        </div>
      </div>
    </>
  );
}
