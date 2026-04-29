import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { TrendingUp } from "lucide-react";

interface KeywordOpportunity {
  keyword: string;
  currentRank: number;
  searchVolume: number;
  difficulty: "easy" | "medium" | "hard";
  recommendedPage: string;
}

const mockOpportunities: KeywordOpportunity[] = [
  {
    keyword: "education graduate programs florida",
    currentRank: 12,
    searchVolume: 2400,
    difficulty: "medium",
    recommendedPage: "/programs/graduate-studies",
  },
  {
    keyword: "uf college of education faculty",
    currentRank: 8,
    searchVolume: 1800,
    difficulty: "easy",
    recommendedPage: "/faculty/directory",
  },
  {
    keyword: "education research grants",
    currentRank: 15,
    searchVolume: 3200,
    difficulty: "hard",
    recommendedPage: "/research/grants",
  },
  {
    keyword: "teacher certification florida",
    currentRank: 11,
    searchVolume: 4100,
    difficulty: "medium",
    recommendedPage: "/programs/certification",
  },
  {
    keyword: "doctoral programs education online",
    currentRank: 9,
    searchVolume: 1950,
    difficulty: "easy",
    recommendedPage: "/programs/online-doctoral",
  },
];

const difficultyConfig = {
  easy: { className: "bg-green-100 text-green-700", label: "Easy" },
  medium: { className: "bg-amber-100 text-amber-700", label: "Medium" },
  hard: { className: "bg-red-100 text-red-700", label: "Hard" },
};

export function KeywordOpportunities() {
  return (
    <div className="bg-white border rounded-lg">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Keyword Opportunities</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Keywords ranking on page 2 with optimization potential
            </p>
          </div>
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="text-left p-4 text-sm font-medium">Keyword</th>
              <th className="text-left p-4 text-sm font-medium">Current Rank</th>
              <th className="text-left p-4 text-sm font-medium">Search Volume</th>
              <th className="text-left p-4 text-sm font-medium">Difficulty</th>
              <th className="text-left p-4 text-sm font-medium">Recommended Page</th>
              <th className="text-left p-4 text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mockOpportunities.map((opportunity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4">
                  <span className="text-sm font-medium">{opportunity.keyword}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">#{opportunity.currentRank}</span>
                    {opportunity.currentRank <= 15 && (
                      <span className="text-xs text-green-600">Page 2</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm">
                    {opportunity.searchVolume.toLocaleString()}/mo
                  </span>
                </td>
                <td className="p-4">
                  <Badge
                    variant="secondary"
                    className={difficultyConfig[opportunity.difficulty].className}
                  >
                    {difficultyConfig[opportunity.difficulty].label}
                  </Badge>
                </td>
                <td className="p-4">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {opportunity.recommendedPage}
                  </code>
                </td>
                <td className="p-4">
                  <Button size="sm" className="bg-[#003087] hover:bg-[#002866]">
                    Optimize
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
