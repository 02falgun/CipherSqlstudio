import { apiClient } from './apiClient';

export const hintService = {
  getHint: async ({ assignmentQuestion, userQueryAttempt }) => {
    return apiClient.post('/hint', {
      assignmentQuestion,
      userQueryAttempt
    });
  }
};
