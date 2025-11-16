
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy, Mail, Phone } from "lucide-react";

const faqItems = [
  {
    question: "How are queries prioritized?",
    answer: "Queries are automatically prioritized by our AI system based on urgency, sentiment, and keywords. 'High' priority items require immediate attention, 'Medium' priority should be addressed soon, and 'Low' priority can be handled when time permits."
  },
  {
    question: "What does 'escalated' mean?",
    answer: "An escalated query is one that the AI or a team member has determined requires attention from a more specialized team, such as Support Leads for critical complaints or Engineering for technical feature requests."
  },
  {
    question: "How do I change a query's status?",
    answer: "You can change a query's status from the query details view. Typical statuses are 'Open', 'In Progress', and 'Resolved'. Marking a query as 'Resolved' indicates the customer's issue has been addressed."
  },
  {
    question: "Can I reassign a query to another agent?",
    answer: "Yes, from the query details panel, you can reassign a query to any other agent in the system. This will add an entry to the query's history log."
  }
];


export default function SupportPage() {
    return (
        <div className="flex flex-col h-full">
            <header className="p-4 border-b">
                <h1 className="text-2xl font-headline font-semibold">Support</h1>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2">
                                <LifeBuoy/>
                                Frequently Asked Questions
                            </CardTitle>
                            <CardDescription>Find answers to common questions about using Verity Response.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {faqItems.map((item, index) => (
                                    <AccordionItem value={`item-${index}`} key={index}>
                                        <AccordionTrigger>{item.question}</AccordionTrigger>
                                        <AccordionContent>
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Contact Support</CardTitle>
                            <CardDescription>Can't find what you're looking for? Reach out to us directly.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-muted-foreground"/>
                                <a href="mailto:support@verity-response.com" className="text-primary hover:underline">
                                    support@verity-response.com
                                </a>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-muted-foreground"/>
                                <span>+1 (800) 555-0199</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
