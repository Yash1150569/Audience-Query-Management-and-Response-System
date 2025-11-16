'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { intelligentQueryTagging } from '@/ai/flows/intelligent-query-tagging';
import { determinePriority } from '@/ai/flows/priority-detection-and-escalation';
import type { Agent, Query } from '@/lib/types';
import { queries, agents } from '@/lib/mock-data';

const createQuerySchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters."),
  customerEmail: z.string().email("Please enter a valid email."),
  source: z.enum(['Email', 'Twitter', 'Chat', 'Facebook']),
  content: z.string().min(10, "Query content must be at least 10 characters.").max(500, "Query content is too long."),
});

const updateProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email."),
});


function assignAgent(category: 'question' | 'request' | 'complaint', priority: 'high' | 'medium' | 'low'): Agent {
    let targetTeam: Agent['team'] = 'Tier 1 Support';

    if (category === 'complaint' && priority === 'high') {
        targetTeam = 'Support Leads';
    } else if (category === 'request' && priority === 'high') {
        targetTeam = 'Engineering';
    }

    const teamAgents = agents.filter(a => a.team === targetTeam);
    if (teamAgents.length > 0) {
        return teamAgents[Math.floor(Math.random() * teamAgents.length)];
    }
    
    // Fallback to any agent if no one is in the target team
    return agents[Math.floor(Math.random() * agents.length)];
}

export async function createQueryAction(values: z.infer<typeof createQuerySchema>) {
    try {
        const { content } = values;

        // Run AI flows in parallel for efficiency
        const [tagResult, priorityResult] = await Promise.all([
            intelligentQueryTagging({ query: content }),
            determinePriority({ query: content })
        ]);

        const assignedAgent = assignAgent(tagResult.category, priorityResult.priority);
        
        const newQuery: Query = {
            id: `VR-${Math.floor(Math.random() * 90000) + 10000}`,
            customer: {
                name: values.customerName,
                email: values.customerEmail,
                avatarUrl: `https://picsum.photos/seed/${values.customerName.replace(/\s/g, '')}/40/40`,
            },
            source: values.source,
            content: values.content,
            category: tagResult.category,
            priority: priorityResult.priority,
            escalated: priorityResult.escalate,
            status: 'Open',
            assignedTo: assignedAgent,
            createdAt: new Date().toISOString(),
            resolvedAt: null,
            history: [{
                timestamp: new Date().toISOString(),
                action: 'Query created, analyzed, and auto-assigned',
                actor: 'System'
            }]
        };

        // Prepend to our in-memory "database". This is for demo purposes.
        // In a real app, you would insert this into your database.
        queries.unshift(newQuery);

        // Revalidate paths to update the UI
        revalidatePath('/dashboard');
        revalidatePath('/analytics');

        return { success: true, message: `Query ${newQuery.id} created.` };
    } catch (error) {
        console.error("Error in createQueryAction:", error);
        return { success: false, message: 'An error occurred while using AI. Please try again.' };
    }
}

export async function updateProfileAction(values: z.infer<typeof updateProfileSchema>) {
    try {
        // In a real app, you'd update the user's profile in the database.
        // For this demo, we'll just log it and return success.
        console.log("Updating profile with:", values);

        // Simulate a short delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return { success: true, message: 'Your profile has been updated successfully.' };
    } catch (error) {
        console.error("Error in updateProfileAction:", error);
        return { success: false, message: 'An error occurred while updating your profile.' };
    }
}
