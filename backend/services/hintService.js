import { env } from '../config/env.js';

const fallbackHint =
  'Break the problem into SELECT columns, JOIN conditions, filters, and ordering. Validate each clause step-by-step.';

export const generateHint = async ({ assignmentTitle, assignmentDescription, studentQuery }) => {
  if (!env.openaiApiKey) {
    return {
      hint: fallbackHint,
      source: 'fallback'
    };
  }

  const response = await fetch(`${env.openaiBaseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.openaiApiKey}`
    },
    body: JSON.stringify({
      model: env.openaiModel,
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content:
            'You are a SQL tutor. Give short, practical hints. Do not provide full final answers. Keep hints under 90 words.'
        },
        {
          role: 'user',
          content: `Assignment: ${assignmentTitle}\nDescription: ${assignmentDescription}\nStudent query: ${studentQuery}`
        }
      ]
    })
  });

  if (!response.ok) {
    return {
      hint: fallbackHint,
      source: 'fallback'
    };
  }

  const json = await response.json();
  const hint = json?.choices?.[0]?.message?.content?.trim() || fallbackHint;

  return {
    hint,
    source: 'llm'
  };
};
