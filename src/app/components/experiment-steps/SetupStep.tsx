import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { useState } from "react";

export function SetupStep() {
  const [multiSiteEnabled, setMultiSiteEnabled] = useState(false);
  const [trafficSplit, setTrafficSplit] = useState([50]);

  return (
    <div className="space-y-8">
      {/* Experiment Name */}
      <div className="space-y-2">
        <Label htmlFor="experiment-name" className="text-base">
          Experiment Name
        </Label>
        <Input
          id="experiment-name"
          placeholder="e.g., Homepage Hero CTA Button Test"
          className="text-lg h-12"
        />
      </div>

      {/* Goal Metric */}
      <div className="space-y-3">
        <Label className="text-base">Goal Metric</Label>
        <RadioGroup defaultValue="conversion">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <label className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="conversion" id="conversion" />
              <div>
                <p className="font-medium text-sm">Conversion Rate</p>
                <p className="text-xs text-muted-foreground">Form submissions, signups</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="ctr" id="ctr" />
              <div>
                <p className="font-medium text-sm">Click-through Rate</p>
                <p className="text-xs text-muted-foreground">Button, link clicks</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="time" id="time" />
              <div>
                <p className="font-medium text-sm">Time on Page</p>
                <p className="text-xs text-muted-foreground">Engagement duration</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="bounce" id="bounce" />
              <div>
                <p className="font-medium text-sm">Bounce Rate</p>
                <p className="text-xs text-muted-foreground">Exit percentage</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="custom" id="custom" />
              <div>
                <p className="font-medium text-sm">Custom</p>
                <p className="text-xs text-muted-foreground">Define your own</p>
              </div>
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Site Selection */}
      <div className="space-y-3">
        <Label htmlFor="site" className="text-base">
          Primary Site
        </Label>
        <Select defaultValue="coe-main">
          <SelectTrigger id="site">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="coe-main">COE Main</SelectItem>
            <SelectItem value="research">Research Portal</SelectItem>
            <SelectItem value="alumni">Alumni Portal</SelectItem>
            <SelectItem value="faculty">Faculty Portal</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Switch
            id="multi-site"
            checked={multiSiteEnabled}
            onCheckedChange={setMultiSiteEnabled}
          />
          <Label htmlFor="multi-site" className="text-sm font-normal">
            Apply to multiple sites
          </Label>
        </div>

        {multiSiteEnabled && (
          <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
            {["Research Portal", "Alumni Portal", "Faculty Portal", "Academic Programs"].map(
              (site) => (
                <div key={site} className="flex items-center space-x-2">
                  <Checkbox id={site} />
                  <label htmlFor={site} className="text-sm">
                    {site}
                  </label>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* Hypothesis */}
      <div className="space-y-2">
        <Label htmlFor="hypothesis" className="text-base">
          Hypothesis
        </Label>
        <Textarea
          id="hypothesis"
          placeholder="We believe that changing [X] will result in [Y] because [Z]..."
          className="min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground">
          Document your assumptions to review after the test
        </p>
      </div>

      {/* Duration */}
      <div className="space-y-3">
        <Label className="text-base">Duration</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-sm">
              Start Date
            </Label>
            <Input id="start-date" type="date" defaultValue="2026-05-01" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date" className="text-sm">
              End Date
            </Label>
            <Input id="end-date" type="date" defaultValue="2026-06-01" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Estimated sample size: <span className="font-medium">~12,400 sessions</span>
        </p>
      </div>

      {/* Traffic Split */}
      <div className="space-y-3">
        <Label className="text-base">Traffic Split</Label>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Slider
                value={trafficSplit}
                onValueChange={setTrafficSplit}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="text-sm font-medium w-24 text-right">
              {trafficSplit[0]}% / {100 - trafficSplit[0]}%
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
              <span className="text-muted-foreground">Control</span>
              <span className="font-medium">{trafficSplit[0]}%</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
              <span className="text-muted-foreground">Variant A</span>
              <span className="font-medium">{100 - trafficSplit[0]}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
