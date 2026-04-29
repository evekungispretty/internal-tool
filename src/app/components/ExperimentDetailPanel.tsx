import { Button } from "./ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Experiment } from "./ABTestManager";

interface ExperimentDetailPanelProps {
  experiment: Experiment;
}

const mockChartData = [
  { date: "Apr 15", control: 11.2, variant: 12.1 },
  { date: "Apr 17", control: 11.8, variant: 13.2 },
  { date: "Apr 19", control: 12.0, variant: 13.8 },
  { date: "Apr 21", control: 12.1, variant: 14.1 },
  { date: "Apr 23", control: 12.3, variant: 14.3 },
  { date: "Apr 25", control: 12.4, variant: 14.2 },
  { date: "Apr 27", control: 12.3, variant: 14.0 },
];

const statsData = [
  { metric: "Sessions", control: "4,521", variant: "4,498", delta: "-0.5%", significance: "No" },
  { metric: "Conversions", control: "556", variant: "630", delta: "+13.3%", significance: "Yes" },
  { metric: "Conversion Rate", control: "12.3%", variant: "14.0%", delta: "+1.7pp", significance: "Yes" },
  { metric: "Revenue per Visitor", control: "$4.23", variant: "$4.89", delta: "+15.6%", significance: "Yes" },
  { metric: "Bounce Rate", control: "42.1%", variant: "39.8%", delta: "-2.3pp", significance: "No" },
];

export function ExperimentDetailPanel({ experiment }: ExperimentDetailPanelProps) {
  return (
    <div className="bg-gray-50 border-t p-6 space-y-6">
      {/* Title */}
      <h3 className="text-lg font-semibold">
        {experiment.name} · Detailed Results
      </h3>

      {/* Chart and Stats Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Line Chart */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-medium mb-4">Conversion Rate Over Time</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                stroke="#888"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#888"
                domain={[10, 16]}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="control"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Control"
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="variant"
                stroke="#f97316"
                strokeWidth={2}
                name="Variant A"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Stats Table */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-medium mb-4">Performance Metrics</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Metric</th>
                  <th className="text-right py-2 font-medium">Control</th>
                  <th className="text-right py-2 font-medium">Variant A</th>
                  <th className="text-right py-2 font-medium">Delta</th>
                  <th className="text-right py-2 font-medium">Sig.</th>
                </tr>
              </thead>
              <tbody>
                {statsData.map((row, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-3 text-muted-foreground">{row.metric}</td>
                    <td className="text-right py-3 font-medium">{row.control}</td>
                    <td className="text-right py-3 font-medium">{row.variant}</td>
                    <td
                      className={`text-right py-3 font-medium ${
                        row.delta.startsWith("+")
                          ? "text-green-600"
                          : row.delta.startsWith("-")
                          ? "text-red-600"
                          : ""
                      }`}
                    >
                      {row.delta}
                    </td>
                    <td className="text-right py-3">
                      {row.significance === "Yes" ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row: Traffic Split, Winning Criteria, Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Traffic Split */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-medium mb-4">Traffic Split</h4>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="20"
                  strokeDasharray="125.6 125.6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="20"
                  strokeDasharray="125.6 125.6"
                  strokeDashoffset="-125.6"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium">50/50</span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm" />
              <span className="text-sm">Control: 50%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-sm" />
              <span className="text-sm">Variant A: 50%</span>
            </div>
          </div>
        </div>

        {/* Winning Criteria */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-medium mb-4">Winning Criteria</h4>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground">Metric</p>
              <p className="font-medium">Conversions</p>
            </div>
            <div>
              <p className="text-muted-foreground">Min. Detectable Effect</p>
              <p className="font-medium">5%</p>
            </div>
            <div>
              <p className="text-muted-foreground">Confidence Threshold</p>
              <p className="font-medium">95%</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="font-medium mb-4">Actions</h4>
          <div className="space-y-2">
            <Button className="w-full bg-[#003087] hover:bg-[#002866]">
              Declare Winner & Apply
            </Button>
            <Button variant="outline" className="w-full">
              Stop Test
            </Button>
            <Button variant="outline" className="w-full">
              Extend Duration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
