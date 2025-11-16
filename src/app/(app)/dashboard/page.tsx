import { queries } from '@/lib/mock-data';
import type { Query } from '@/lib/types';
import { QueryTable } from '@/components/dashboard/query-table';
import { NewQueryDialog } from '@/components/dashboard/new-query-dialog';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // In a real app, you'd fetch this from a database
  const allQueries: Query[] = [...queries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="flex flex-col h-full bg-card rounded-xl">
      <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-card/95 backdrop-blur-sm z-10 rounded-t-xl">
        <h1 className="text-2xl font-headline font-semibold">Inbox</h1>
        <NewQueryDialog />
      </header>
      <main className="flex-1 overflow-auto">
        <QueryTable queries={allQueries} />
      </main>
    </div>
  );
}
