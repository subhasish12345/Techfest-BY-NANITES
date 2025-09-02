'use server';

/**
 * @fileOverview Recommends relevant event categories based on user profiles.
 *
 * - recommendEventCategories - A function that recommends event categories.
 * - RecommendEventCategoriesInput - The input type for the recommendEventCategories function.
 * - RecommendEventCategoriesOutput - The return type for the recommendEventCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendEventCategoriesInputSchema = z.object({
  userProfile: z
    .string()
    .describe('A description of the user profile, interests and preferences.'),
  eventCategories: z
    .array(z.string())
    .describe('A list of available event categories.'),
});
export type RecommendEventCategoriesInput = z.infer<
  typeof RecommendEventCategoriesInputSchema
>;

const RecommendEventCategoriesOutputSchema = z.object({
  recommendedCategories: z
    .array(z.string())
    .describe('A list of event categories recommended for the user.'),
});
export type RecommendEventCategoriesOutput = z.infer<
  typeof RecommendEventCategoriesOutputSchema
>;

export async function recommendEventCategories(
  input: RecommendEventCategoriesInput
): Promise<RecommendEventCategoriesOutput> {
  return recommendEventCategoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendEventCategoriesPrompt',
  input: {schema: RecommendEventCategoriesInputSchema},
  output: {schema: RecommendEventCategoriesOutputSchema},
  prompt: `You are an AI assistant specializing in event recommendations.

  Based on the user profile:
  {{userProfile}}

  And the following available event categories:
  {{#each eventCategories}}
  - {{this}}
  {{/each}}

  Recommend the most relevant event categories for the user.
  Ensure that the output is a JSON object with a field called 'recommendedCategories',
  which is an array of strings.
  Do not include any other text in the output.`,
});

const recommendEventCategoriesFlow = ai.defineFlow(
  {
    name: 'recommendEventCategoriesFlow',
    inputSchema: RecommendEventCategoriesInputSchema,
    outputSchema: RecommendEventCategoriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
