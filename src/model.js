import OpenAI from 'openai';

import systemPrompt from './systemPrompt.md?raw';
import userPrompt from './userPrompt.md?raw';
import randomPrompt from './randomPrompt.md?raw';

const token = import.meta.env.VITE_GITHUB_TOKEN;
const endpoint = 'https://models.inference.ai.azure.com';
const modelName = 'gpt-4o-mini';

export async function getChatCompletion(userInput) {
  const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token,
    dangerouslyAllowBrowser: true,
  });

  const systemMessage = systemPrompt;
  const userMessage =
    userInput === 'random'
      ? randomPrompt
      : userPrompt.replace('{0}', userInput);

  const response = await client.chat.completions.create({
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: userMessage },
    ],
    temperature: 1.0,
    top_p: 1.0,
    max_tokens: 1000,
    model: modelName,
  });

  return response.choices[0].message.content;
}
