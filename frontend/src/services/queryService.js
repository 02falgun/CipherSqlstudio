import { apiClient } from './apiClient';

export const queryService = {
  execute: async ({ query }) => {
    return apiClient.post('/execute-query', {
      query
    });
  }
};
