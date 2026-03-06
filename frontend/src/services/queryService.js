import { apiClient } from './apiClient';

export const queryService = {
  execute: async ({ assignmentId, studentId, query }) => {
    return apiClient.post('/api/query/execute', {
      assignmentId,
      studentId,
      query
    });
  }
};
