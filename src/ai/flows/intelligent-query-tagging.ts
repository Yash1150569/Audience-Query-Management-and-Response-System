'use server';

/**
 * @fileOverview This file contains the Genkit flow for intelligent query tagging.
 *
 * It defines:
 * - intelligentQueryTagging - A function that takes a query string as input and returns a classification (question, request, complaint).
 * - IntelligentQueryTaggingInput - The input type for the intelligentQueryTagging function.
 * - IntelligentQueryTaggingOutput - The return type for the intelligentQueryTagging function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentQueryTaggingInputSchema = z.object({
  query: z.string().describe('The query string to classify.'),
});
export type IntelligentQueryTaggingInput = z.infer<
  typeof IntelligentQueryTaggingInputSchema
>;

const IntelligentQueryTaggingOutputSchema = z.object({
  category: z
    .enum(['question', 'request', 'complaint'])
    .describe('The category of the query.'),
});
export type IntelligentQueryTaggingOutput = z.infer<
  typeof IntelligentQueryTaggingOutputSchema
>;

export async function intelligentQueryTagging(
  input: IntelligentQueryTaggingInput
): Promise<IntelligentQueryTaggingOutput> {
  return intelligentQueryTaggingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentQueryTaggingPrompt',
  input: {schema: IntelligentQueryTaggingInputSchema},
  output: {schema: IntelligentQueryTaggingOutputSchema},
  prompt: `You are an expert at classifying user queries into one of three categories: question, request, or complaint.

  Given the following query, classify it into one of the three categories.

  Query: {{{query}}}

  Category:`,
});

const intelligentQueryTaggingFlow = ai.defineFlow(
  {
    name: 'intelligentQueryTaggingFlow',
    inputSchema: IntelligentQueryTaggingInputSchema,
    outputSchema: IntelligentQueryTaggingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
