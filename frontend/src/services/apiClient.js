const parseResponse = async (response) => {
  const payload = await response.json().catch(() => ({}));

  if (payload?.success === false) {
    throw new Error(payload.error || payload.message || 'Request failed');
  }

  if (!response.ok) {
    throw new Error(payload.error || payload.message || 'Request failed');
  }

  return payload;
};

export const apiClient = {
  get: async (url) => {
    const response = await fetch(url);
    return parseResponse(response);
  },
  post: async (url, body) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    return parseResponse(response);
  }
};
