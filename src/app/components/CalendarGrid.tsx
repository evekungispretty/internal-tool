import { Badge } from "./ui/badge";
import { ContentItem } from "./EditorialCalendar";

interface CalendarGridProps {
  currentMonth: Date;
  calendarData: { [key: string]: ContentItem[] };
  onContentClick: (content: ContentItem) => void;
}

const statusColors = {
  draft: "bg-gray-400",
  "in-review": "bg-yellow-500",
  scheduled: "bg-blue-500",
  live: "bg-green-500",
};

export function CalendarGrid({ currentMonth, calendarData, onContentClick }: CalendarGridProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create array of day numbers
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => null);
  const allCells = [...blanks, ...days];

  const today = new Date();
  const isToday = (day: number | null) => {
    if (!day) return false;
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const getDateKey = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden h-full flex flex-col">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr">
        {allCells.map((day, index) => {
          const dateKey = day ? getDateKey(day) : "";
          const dayContent = day && dateKey ? calendarData[dateKey] || [] : [];
          const displayedContent = dayContent.slice(0, 3);
          const overflowCount = dayContent.length - 3;

          return (
            <div
              key={index}
              className={`border-r border-b last:border-r-0 p-2 min-h-[120px] ${
                !day ? "bg-gray-50" : ""
              } ${isToday(day) ? "bg-blue-50" : ""}`}
            >
              {day && (
                <>
                  <div className={`text-sm mb-2 ${isToday(day) ? "font-bold text-[#003087]" : "text-muted-foreground"}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {displayedContent.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onContentClick(item)}
                        className="w-full text-left p-1.5 rounded hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-start gap-1.5">
                          <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${statusColors[item.status]}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{item.siteName}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                    {overflowCount > 0 && (
                      <button className="w-full text-left p-1 text-xs text-[#003087] hover:underline">
                        +{overflowCount} more
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
