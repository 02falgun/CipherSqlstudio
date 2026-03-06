import { env } from '../config/env.js';

const fallbackHint =
  'Break the problem into SELECT columns, JOIN conditions, filters, and ordering. Validate each clause step-by-step.';

const sanitizeHint = (hintText) => {
  const trimmed = (hintText || '').trim();

  if (!trimmed) {
    return fallbackHint;
  }

  const hasSqlCodeBlock = /```\s*sql|```/i.test(trimmed);
  const looksLikeFullSql = /^\s*select\b[\s\S]*from\b/i.test(trimmed);

  if (hasSqlCodeBlock || looksLikeFullSql) {
    return 'Think about the result shape first, then identify the tables to read from and the grouping needed. Try using aggregate functions with GROUP BY and add filters carefully.';
  }

  return trimmed;
};

export const generateHint = async ({ assignmentTitle, assignmentDescription, studentQuery }) => {
  if (!env.openaiApiKey) {
    return {
      hint: fallbackHint,
      source: 'fallback'
    };
  }

  let response;

  try {
    response = await fetch(`${env.openaiBaseUrl}/chat/completions`, {
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
              'You are a SQL tutor. Return only a helpful hint. Guide the student with concepts and next steps. Never provide the full SQL query, never reveal the final solution, and never output code blocks.'
          },
          {
            role: 'user',
            content: `Assignment: ${assignmentTitle}\nQuestion: ${assignmentDescription}\nStudent SQL attempt: ${studentQuery}\nGive a concise hint and mention 1-2 relevant SQL concepts.`
          }
        ]
      })
    });
  } catch (_error) {
    return {
      hint: fallbackHint,
      source: 'fallback'
    };
  }

  if (!response.ok) {
    return {
      hint: fallbackHint,
      source: 'fallback'
    };
  }

  const json = await response.json();
  const hint = sanitizeHint(json?.choices?.[0]?.message?.content);

  return {
    hint,
    source: 'llm'
  };
};
