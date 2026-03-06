import { useEffect, useState } from 'react';

import { assignmentService } from '../services/assignmentService';

export const useAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAssignments = async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await assignmentService.getAssignments();
      setAssignments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  return {
    assignments,
    isLoading,
    error,
    reload: loadAssignments
  };
};
