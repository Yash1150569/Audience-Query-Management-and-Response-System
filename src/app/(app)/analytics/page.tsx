import { StatsCards } from "@/components/analytics/stats-cards";
import { QueryTypesChart } from "@/components/analytics/query-types-chart";
import { TeamPerformanceTable } from "@/components/analytics/team-performance-table";
import { queries, agents } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-headline font-semibold">Analytics</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 space-y-4">
        <StatsCards queries={queries} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="font-headline">Query Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <QueryTypesChart queries={queries} />
            </CardContent>
          </Card>
          <Card className="col-span-4 lg:col-span-3">
             <CardHeader>
              <CardTitle className="font-headline">Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <TeamPerformanceTable queries={queries} agents={agents} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
