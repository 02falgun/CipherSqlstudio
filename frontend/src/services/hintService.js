import { apiClient } from './apiClient';

export const hintService = {
  getHint: async ({ assignmentId, query }) => {
    return apiClient.post('/api/hints', {
      assignmentId,
      query
    });
  }
};
