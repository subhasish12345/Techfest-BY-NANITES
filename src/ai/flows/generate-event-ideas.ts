'use server';

/**
 * @fileOverview Generates creative ideas, strategies, and resources for a specific event.
 *
 * - generateEventIdeas - A function that generates ideas for a given event.
 * - GenerateEventIdeasInput - The input type for the generateEventIdeas function.
 * - GenerateEventIdeasOutput - The return type for the generateEventIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventIdeasInputSchema = z.object({
  eventTitle: z.string().describe('The title of the event.'),
  eventDescription: z.string().describe('The description of the event.'),
});
export type GenerateEventIdeasInput = z.infer<
  typeof GenerateEventIdeasInputSchema
>;

const GenerateEventIdeasOutputSchema = z.object({
  creativeIdeas: z
    .array(z.string())
    .describe(
      'A list of 3-5 unique or creative ideas or approaches for the event.'
    ),
  implementationStrategies: z
    .array(z.string())
    .describe(
      'A list of 3-5 actionable steps or strategies to perform well in the event.'
    ),
  learningResources: z
    .array(
      z.object({
        title: z.string().describe('The title of the resource.'),
        url: z.string().url().describe('The URL to the resource.'),
        description: z.string().describe('A brief description of the resource.')
      })
    )
    .describe(
      'A list of 3-5 useful articles, tutorials, or tools, each with a title, URL, and description.'
    ),
});
export type GenerateEventIdeasOutput = z.infer<
  typeof GenerateEventIdeasOutputSchema
>;

export async function generateEventIdeas(
  input: GenerateEventIdeasInput
): Promise<GenerateEventIdeasOutput> {
  return generateEventIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEventIdeasPrompt',
  input: {schema: GenerateEventIdeasInputSchema},
  output: {schema: GenerateEventIdeasOutputSchema},
  prompt: `You are an expert mentor and coach for technology and cultural festivals.
  A student is participating in the following event and needs your help to prepare and stand out.

  Event Title: {{{eventTitle}}}
  Event Description: {{{eventDescription}}}

  Your task is to provide innovative and practical advice to help the student excel.
  Generate the following based on the event details:

  1.  **Creative Ideas**: Suggest 3 to 5 unique or creative approaches the student could take. Think outside the box.
  2.  **Implementation Strategies**: Provide 3 to 5 actionable steps or strategies for executing their project or performance. Be specific.
  3.  **Learning Resources**: List 3 to 5 highly relevant online resources (articles, tutorials, tools, documentation) that can help the student learn and prepare. For each resource, provide a title, a valid URL, and a brief description of why it's useful for this event.

  Present your response in the required JSON format.
  `,
});

const generateEventIdeasFlow = ai.defineFlow(
  {
    name: 'generateEventIdeasFlow',
    inputSchema: GenerateEventIdeasInputSchema,
    outputSchema: GenerateEventIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
