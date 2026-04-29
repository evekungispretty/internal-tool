import { Button } from "./ui/button";

interface SiteScore {
  name: string;
  score: number;
}

const siteScores: SiteScore[] = [
  { name: "Academic Affairs", score: 52 },
  { name: "Student Services", score: 58 },
  { name: "Faculty Portal", score: 63 },
  { name: "Events", score: 68 },
  { name: "Alumni Portal", score: 71 },
  { name: "Research Portal", score: 78 },
  { name: "Academic Programs", score: 82 },
  { name: "COE Main", score: 89 },
];

const getScoreColor = (score: number) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
};

const getScoreTextColor = (score: number) => {
  if (score >= 80) return "text-green-700";
  if (score >= 60) return "text-amber-700";
  return "text-red-700";
};

export function ScoreBySite() {
  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Score by Site</h3>
        <p className="text-sm text-muted-foreground">Sorted worst-first</p>
      </div>

      <div className="space-y-3 mb-4">
        {siteScores.map((site) => (
          <div key={site.name} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{site.name}</span>
              <span className={`text-sm font-bold ${getScoreTextColor(site.score)}`}>
                {site.score}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${getScoreColor(site.score)}`}
                style={{ width: `${site.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Button variant="link" className="w-full p-0 h-auto text-[#003087]">
        View All Sites
      </Button>
    </div>
  );
}
