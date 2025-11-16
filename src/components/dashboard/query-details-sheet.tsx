'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { Query } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { format } from "date-fns";

type QueryDetailsSheetProps = {
  query: Query | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const priorityVariant: { [key in Query['priority']]: 'destructive' | 'secondary' | 'outline' } = {
    high: 'destructive',
    medium: 'secondary',
    low: 'outline',
    unclassified: 'outline',
};

export function QueryDetailsSheet({ query, isOpen, onOpenChange }: QueryDetailsSheetProps) {
  if (!query) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] p-0">
        <ScrollArea className="h-full">
        <SheetHeader className="p-6 text-left">
          <SheetTitle className="font-headline text-2xl">Query #{query.id}</SheetTitle>
          <SheetDescription>
            Created on {format(new Date(query.createdAt), "PPP p")}
          </SheetDescription>
        </SheetHeader>
        <div className="p-6 space-y-6">
            <div className="space-y-4">
                <h3 className="font-semibold font-headline">Customer Details</h3>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={query.customer.avatarUrl} data-ai-hint="person avatar"/>
                        <AvatarFallback>{query.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{query.customer.name}</p>
                        <p className="text-sm text-muted-foreground">{query.customer.email}</p>
                    </div>
                </div>
            </div>

            <Separator/>
            
            <div className="space-y-4">
                <h3 className="font-semibold font-headline">Query Details</h3>
                <div className="text-sm bg-muted/50 p-4 rounded-lg leading-relaxed">
                    {query.content}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1"><p className="text-muted-foreground">Source</p><p>{query.source}</p></div>
                    <div className="space-y-1"><p className="text-muted-foreground">Status</p><p>{query.status}</p></div>
                    <div className="space-y-1"><p className="text-muted-foreground">Category</p><Badge variant="outline" className="capitalize">{query.category}</Badge></div>
                    <div className="space-y-1"><p className="text-muted-foreground">Priority</p><Badge variant={priorityVariant[query.priority]} className="capitalize">{query.priority}</Badge></div>
                    <div className="space-y-1"><p className="text-muted-foreground">Assigned To</p><p>{query.assignedTo.name}</p></div>
                    <div className="space-y-1"><p className="text-muted-foreground">Escalated</p><p>{query.escalated ? "Yes" : "No"}</p></div>
                </div>
            </div>

            <Separator/>
            
            <div className="space-y-4">
                <h3 className="font-semibold font-headline">History</h3>
                <ul className="space-y-4 text-sm">
                    {query.history.map((entry, index) => (
                        <li key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 bg-primary rounded-full mt-1"/>
                                <div className="flex-grow w-px bg-border"/>
                            </div>
                            <div>
                                <p className="font-medium">{entry.action} by <span className="text-primary">{entry.actor}</span></p>
                                <p className="text-xs text-muted-foreground">{format(new Date(entry.timestamp), "PPp")}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
