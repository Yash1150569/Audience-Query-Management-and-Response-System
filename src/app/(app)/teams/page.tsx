
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { agents } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function TeamsPage() {
    return (
        <div className="flex flex-col h-full">
            <header className="p-4 border-b">
                <h1 className="text-2xl font-headline font-semibold">Teams</h1>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {agents.map(agent => (
                        <Card key={agent.id}>
                            <CardHeader className="items-center">
                                <Avatar className="w-20 h-20 mb-2">
                                    <AvatarImage src={agent.avatarUrl} data-ai-hint="person avatar"/>
                                    <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <CardTitle className="font-headline text-xl">{agent.name}</CardTitle>
                                <CardDescription>{agent.team}</CardDescription>
                            </CardHeader>
                            <CardContent className="text-center">
                                 <Badge variant={
                                    agent.team === 'Support Leads' ? 'destructive' :
                                    agent.team === 'Engineering' ? 'secondary' :
                                    'default'
                                 }>{agent.team}</Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
