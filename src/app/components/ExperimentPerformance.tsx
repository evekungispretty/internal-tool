import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

export function ExperimentPerformance() {
  const controlRate = 12.3;
  const variantRate = 14.0;
  const maxRate = 16;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Experiment Performance</CardTitle>
        <Badge className="bg-green-100 text-green-700 border-green-200">
          Variant A winning +14%
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Control</span>
              <span className="text-sm">{controlRate}%</span>
            </div>
            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className="h-full bg-gray-400 rounded-lg"
                style={{ width: `${(controlRate / maxRate) * 100}%` }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Variant A</span>
              <span className="text-sm">{variantRate}%</span>
            </div>
            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-lg"
                style={{ width: `${(variantRate / maxRate) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
