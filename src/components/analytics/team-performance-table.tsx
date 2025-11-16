import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Query, Agent } from "@/lib/types";

type TeamPerformanceTableProps = {
  queries: Query[];
  agents: Agent[];
};

export function TeamPerformanceTable({ queries, agents }: TeamPerformanceTableProps) {
  const performanceData = agents.map(agent => {
    const assignedQueries = queries.filter(q => q.assignedTo.id === agent.id);
    const resolvedQueries = assignedQueries.filter(q => q.resolvedAt);
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
      if (hours > 0) return `${hours}h ${minutes}m`;
      return `${minutes}m`;
    };

    return {
      agent,
      assigned: assignedQueries.length,
      resolved: resolvedQueries.length,
      avgResolutionTime: formatDuration(avgResolutionTimeMs),
    };
  }).sort((a,b) => b.resolved - a.resolved);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Agent</TableHead>
          <TableHead className="text-center">Assigned</TableHead>
          <TableHead className="text-center">Resolved</TableHead>
          <TableHead className="text-right">Avg. Resolution</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {performanceData.map(data => (
          <TableRow key={data.agent.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={data.agent.avatarUrl} data-ai-hint="person avatar"/>
                  <AvatarFallback>{data.agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-medium">{data.agent.name}</p>
                    <p className="text-xs text-muted-foreground">{data.agent.team}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center font-mono">{data.assigned}</TableCell>
            <TableCell className="text-center font-mono">{data.resolved}</TableCell>
            <TableCell className="text-right font-mono">{data.avgResolutionTime}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
