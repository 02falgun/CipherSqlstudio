import { apiClient } from './apiClient';

export const assignmentService = {
  getAssignments: async () => {
    const data = await apiClient.get('/api/assignments');
    return data.assignments || [];
  },
  getAssignmentDetails: async (assignmentId) => {
    return apiClient.get(`/api/assignments/${assignmentId}`);
  },
  seedAssignments: async () => {
    return apiClient.post('/api/assignments/seed', {});
  }
};
