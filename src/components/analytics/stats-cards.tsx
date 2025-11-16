import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Query } from "@/lib/types";
import { ArrowDown, ArrowUp, Clock, Inbox, CheckCircle } from "lucide-react";

type StatsCardsProps = {
  queries: Query[];
};

export function StatsCards({ queries }: StatsCardsProps) {
  const totalQueries = queries.length;
  const openQueries = queries.filter(q => q.status === 'Open' || q.status === 'In Progress').length;
  const resolvedToday = queries.filter(q => q.resolvedAt && new Date(q.resolvedAt).toDateString() === new Date().toDateString()).length;

  const resolvedQueries = queries.filter(q => q.resolvedAt);
  const totalResolutionTime = resolvedQueries.reduce((acc, q) => {
    if (q.resolvedAt) {
      return acc + (new Date(q.resolvedAt).getTime() - new Date(q.createdAt).getTime());
    }
    return acc;
  }, 0);
  const avgResolutionTimeMs = resolvedQueries.length > 0 ? totalResolutionTime / resolvedQueries.length : 0;
  
  const formatDuration = (ms: number) => {
    if (ms === 0) return 'N/A';
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const avgResolutionTime = formatDuration(avgResolutionTimeMs);

  const stats = [
    { title: "Total Queries", value: totalQueries, icon: Inbox, change: "+5.2% from last month", changeType: 'increase' as const },
    { title: "Open Queries", value: openQueries, icon: Clock, change: "-1.8% from last month", changeType: 'decrease' as const },
    { title: "Resolved Today", value: resolvedToday, icon: CheckCircle, change: "+12 from yesterday", changeType: 'increase' as const },
    { title: "Avg. Resolution Time", value: avgResolutionTime, icon: Clock, change: "vs. 2h 45m last month", changeType: 'decrease' as const },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stat.changeType === 'increase' ? <ArrowUp className="h-3 w-3 text-green-500"/> : <ArrowDown className="h-3 w-3 text-red-500" />}
                {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
