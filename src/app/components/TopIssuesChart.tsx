export function TopIssuesChart() {
  const issues = [
    { type: "Missing meta", percentage: 34, color: "#f59e0b" },
    { type: "Duplicate title", percentage: 22, color: "#3b82f6" },
    { type: "Broken links", percentage: 18, color: "#ef4444" },
    { type: "Missing alt text", percentage: 15, color: "#8b5cf6" },
    { type: "Slow page speed", percentage: 11, color: "#6b7280" },
  ];

  // Calculate cumulative percentages for the donut chart
  let cumulative = 0;
  const segments = issues.map((issue) => {
    const start = cumulative;
    cumulative += issue.percentage;
    return {
      ...issue,
      start,
      end: cumulative,
    };
  });

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="font-medium mb-6">Top Issues by Type</h3>

      <div className="flex items-center gap-8">
        {/* Donut Chart */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg viewBox="0 0 100 100" className="transform -rotate-90">
            {segments.map((segment, index) => {
              const offset = circumference - (segment.start / 100) * circumference;
              const dashArray = `${(segment.percentage / 100) * circumference} ${circumference}`;

              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="20"
                  strokeDasharray={dashArray}
                  strokeDashoffset={-offset}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">327</div>
              <div className="text-xs text-muted-foreground">Issues</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {issues.map((issue) => (
            <div key={issue.type} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: issue.color }}
                />
                <span className="text-sm">{issue.type}</span>
              </div>
              <span className="text-sm font-medium">{issue.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
