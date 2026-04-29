import { TrendingUp, AlertCircle, FileText } from "lucide-react";

export function SEOScoreCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Network SEO Score */}
      <div className="bg-white border rounded-lg p-6">
        <p className="text-sm text-muted-foreground mb-4">Network SEO Score</p>
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-28 h-28">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {/* Background arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="8"
                strokeDasharray="251.2 251.2"
              />
              {/* Progress arc - 74% */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="8"
                strokeDasharray="186 251.2"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold">74</span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <span className="inline-flex items-center text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
            Needs Improvement
          </span>
        </div>
      </div>

      {/* Pages Indexed */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Pages Indexed</p>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="text-3xl font-bold mb-1">4,821</div>
        <p className="text-sm text-muted-foreground mb-2">of 5,103 total</p>
        <div className="flex items-center gap-1 text-green-600 text-sm">
          <TrendingUp className="h-4 w-4" />
          <span>+2.3% this month</span>
        </div>
      </div>

      {/* Broken Links */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Broken Links</p>
          <AlertCircle className="h-4 w-4 text-red-600" />
        </div>
        <div className="text-3xl font-bold mb-1">38</div>
        <p className="text-sm text-muted-foreground mb-2">across network</p>
        <span className="inline-flex items-center text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
          Needs Attention
        </span>
      </div>

      {/* Missing Meta Descriptions */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Missing Meta Descriptions</p>
          <AlertCircle className="h-4 w-4 text-amber-600" />
        </div>
        <div className="text-3xl font-bold mb-1">112</div>
        <p className="text-sm text-muted-foreground mb-2">pages affected</p>
        <span className="inline-flex items-center text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
          Review Needed
        </span>
      </div>
    </div>
  );
}
