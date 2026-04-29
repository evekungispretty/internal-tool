import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface QuickCreateTaskProps {
  onCancel: () => void;
}

export function QuickCreateTask({ onCancel }: QuickCreateTaskProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Quick Create</h3>

      <Input placeholder="Task title" className="h-9 text-sm" />

      <Select>
        <SelectTrigger className="h-9 text-sm">
          <SelectValue placeholder="Assign to..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="maya">Maya Johnson</SelectItem>
          <SelectItem value="alex">Alex Chen</SelectItem>
          <SelectItem value="jordan">Jordan Smith</SelectItem>
          <SelectItem value="sam">Sam Williams</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="h-9 text-sm">
          <SelectValue placeholder="Link to site/page..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="coe-main">COE Main</SelectItem>
          <SelectItem value="research">Research Portal</SelectItem>
          <SelectItem value="faculty">Faculty Portal</SelectItem>
          <SelectItem value="alumni">Alumni Portal</SelectItem>
        </SelectContent>
      </Select>

      <Input type="date" className="h-9 text-sm" />

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 h-9 text-sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button className="flex-1 h-9 text-sm bg-[#003087] hover:bg-[#002866]">
          Create
        </Button>
      </div>
    </div>
  );
}
