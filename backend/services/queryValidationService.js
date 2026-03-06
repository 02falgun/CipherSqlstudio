const forbiddenKeywords = [
  'insert',
  'update',
  'delete',
  'drop',
  'alter',
  'truncate',
  'create',
  'grant',
  'revoke',
  'copy',
  'call',
  'do',
  'vacuum',
  'analyze'
];

export const validateQuerySafety = (rawQuery) => {
  if (!rawQuery || typeof rawQuery !== 'string') {
    throw new Error('Query is required.');
  }

  const query = rawQuery.trim();

  if (!query) {
    throw new Error('Query cannot be empty.');
  }

  if (query.length > 5000) {
    throw new Error('Query is too large. Maximum size is 5000 characters.');
  }

  const semicolonCount = (query.match(/;/g) || []).length;
  if (semicolonCount > 1 || (semicolonCount === 1 && !query.endsWith(';'))) {
    throw new Error('Only one SQL statement is allowed.');
  }

  const normalized = query.toLowerCase();
  const startsWithAllowed = /^\s*(select|with|explain)\b/.test(normalized);

  if (!startsWithAllowed) {
    throw new Error('Only read-only SELECT/CTE/EXPLAIN queries are allowed.');
  }

  for (const keyword of forbiddenKeywords) {
    const pattern = new RegExp(`\\b${keyword}\\b`, 'i');
    if (pattern.test(query)) {
      throw new Error(`Forbidden SQL keyword detected: ${keyword.toUpperCase()}`);
    }
  }

  return query;
};
