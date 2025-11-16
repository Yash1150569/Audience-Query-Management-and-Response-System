'use client';
import { useState } from 'react';
import type { Query } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QueryDetailsSheet } from './query-details-sheet';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

type Status = 'All' | 'Open' | 'In Progress' | 'Resolved' | 'Closed';
const statuses: Status[] = ['All', 'Open', 'In Progress', 'Resolved'];

const priorityVariant: { [key in Query['priority']]: 'destructive' | 'secondary' | 'outline' } = {
  high: 'destructive',
  medium: 'secondary',
  low: 'outline',
  unclassified: 'outline',
};

const statusVariant: { [key in Query['status']]: 'default' | 'secondary' | 'outline' } = {
  'Open': 'default',
  'In Progress': 'secondary',
  'Resolved': 'outline',
  'Closed': 'outline',
};

export function QueryTable({ queries }: { queries: Query[] }) {
  const [selectedQuery, setSelectedQuery] = useState<Query | null>(null);
  const [activeTab, setActiveTab] = useState<Status>('All');

  const filteredQueries = activeTab === 'All' ? queries : queries.filter(q => q.status === activeTab);

  const handleRowClick = (query: Query) => {
    setSelectedQuery(query);
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Status)} className="p-4">
        <TabsList>
          {statuses.map(status => (
            <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeTab}>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Customer</TableHead>
                  <TableHead>Query</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead className="text-right">Last Update</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQueries.map(query => (
                  <TableRow key={query.id} onClick={() => handleRowClick(query)} className="cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={query.customer.avatarUrl} data-ai-hint="person avatar"/>
                          <AvatarFallback>{query.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{query.customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex flex-col">
                            <span className="font-medium truncate max-w-xs">{query.content}</span>
                            <span className="text-xs text-muted-foreground">from {query.source}</span>
                        </div>
                    </TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{query.category}</Badge></TableCell>
                    <TableCell><Badge variant={priorityVariant[query.priority]} className="capitalize">{query.priority}</Badge></TableCell>
                    <TableCell>
                      <Badge 
                        className={cn("capitalize", query.status === 'Open' ? 'bg-accent text-accent-foreground' : '')}
                        variant={statusVariant[query.status]}
                      >
                        {query.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={query.assignedTo.avatarUrl} data-ai-hint="person avatar" />
                          <AvatarFallback>{query.assignedTo.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{query.assignedTo.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs">
                      {formatDistanceToNow(new Date(query.history[query.history.length-1].timestamp), { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      <QueryDetailsSheet
        query={selectedQuery}
        isOpen={!!selectedQuery}
        onOpenChange={(open) => {
          if (!open) setSelectedQuery(null);
        }}
      />
    </>
  );
}
