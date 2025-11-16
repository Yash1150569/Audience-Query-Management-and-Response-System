'use server';
/**
 * @fileOverview An AI agent that determines the priority of a query based on urgency and sentiment.
 *
 * - determinePriority - A function that determines the priority of a query.
 * - PriorityDetectionAndEscalationInput - The input type for the determinePriority function.
 * - PriorityDetectionAndEscalationOutput - The return type for the determinePriority function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PriorityDetectionAndEscalationInputSchema = z.object({
  query: z.string().describe('The content of the audience query.'),
});
export type PriorityDetectionAndEscalationInput = z.infer<
  typeof PriorityDetectionAndEscalationInputSchema
>;

const PriorityDetectionAndEscalationOutputSchema = z.object({
  priority: z
    .enum(['high', 'medium', 'low'])
    .describe('The priority of the query.'),
  escalate: z
    .boolean()
    .describe(
      'Whether the query should be escalated to a higher priority team.'
    ),
  sentiment: z
    .enum(['positive', 'negative', 'neutral'])
    .describe('The sentiment of the query.'),
});
export type PriorityDetectionAndEscalationOutput = z.infer<
  typeof PriorityDetectionAndEscalationOutputSchema
>;

export async function determinePriority(
  input: PriorityDetectionAndEscalationInput
): Promise<PriorityDetectionAndEscalationOutput> {
  return priorityDetectionAndEscalationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'priorityDetectionAndEscalationPrompt',
  input: {schema: PriorityDetectionAndEscalationInputSchema},
  output: {schema: PriorityDetectionAndEscalationOutputSchema},
  prompt: `You are an AI assistant specializing in determining the priority, sentiment, and escalation needs of audience queries.

  Analyze the following query and determine its priority (high, medium, or low), sentiment (positive, negative, or neutral), and whether it should be escalated to a higher-priority team.

  Query: {{{query}}}

  Consider urgency, potential impact, and overall sentiment when making your determinations.

  Return your answer in JSON format.
  `,
});

const priorityDetectionAndEscalationFlow = ai.defineFlow(
  {
    name: 'priorityDetectionAndEscalationFlow',
    inputSchema: PriorityDetectionAndEscalationInputSchema,
    outputSchema: PriorityDetectionAndEscalationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
