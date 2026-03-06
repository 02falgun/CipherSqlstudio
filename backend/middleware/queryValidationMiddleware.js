const blockedKeywords = ['drop', 'delete', 'alter', 'truncate', 'insert', 'update'];

const hasBlockedKeyword = (query) => {
  return blockedKeywords.some((keyword) => {
    const pattern = new RegExp(`\\b${keyword}\\b`, 'i');
    return pattern.test(query);
  });
};

const hasSqlInjectionPattern = (query) => {
  const injectionPatterns = [
    /--/,
    /\/\*/,
    /\*\//,
    /;\s*\S+/,
    /\b(or|and)\b\s+\d+\s*=\s*\d+/i,
    /\bunion\b\s+\bselect\b/i
  ];

  return injectionPatterns.some((pattern) => pattern.test(query));
};

const reject = (res) => {
  const errorMessage = 'Only SELECT queries are allowed';

  return res.status(400).json({
    success: false,
    error: errorMessage,
    message: errorMessage
  });
};

export const validateSqlQuery = (req, res, next) => {
  const { query } = req.body || {};

  if (typeof query !== 'string') {
    return reject(res);
  }

  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return reject(res);
  }

  if (!/^select\b/i.test(normalizedQuery)) {
    return reject(res);
  }

  const semicolonCount = (normalizedQuery.match(/;/g) || []).length;
  if (semicolonCount > 1 || (semicolonCount === 1 && !normalizedQuery.endsWith(';'))) {
    return reject(res);
  }

  if (hasBlockedKeyword(normalizedQuery) || hasSqlInjectionPattern(normalizedQuery)) {
    return reject(res);
  }

  return next();
};
