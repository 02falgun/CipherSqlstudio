import { useEffect, useMemo, useState } from 'react';

import { assignmentService } from '../services/assignmentService';
import { queryService } from '../services/queryService';
import { hintService } from '../services/hintService';

const defaultStudentId = 'student-demo';

export const useAssignmentAttempt = (assignmentId) => {
  const [assignment, setAssignment] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [query, setQuery] = useState('SELECT * FROM students LIMIT 10;');
  const [queryResult, setQueryResult] = useState(null);
  const [hintText, setHintText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [error, setError] = useState('');

  const loadAssignment = async () => {
    if (!assignmentId) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await assignmentService.getAssignmentDetails(assignmentId);
      setAssignment(data.assignment);
      setAttempts(data.attempts || []);
      setQuery(data.assignment?.starterQuery || 'SELECT * FROM students LIMIT 10;');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAssignment();
  }, [assignmentId]);

  const executeQuery = async () => {
    if (!assignmentId) {
      return;
    }

    setIsExecuting(true);
    setError('');

    try {
      const payload = await queryService.execute({
        assignmentId,
        studentId: defaultStudentId,
        query
      });
      setQueryResult(payload.result);
      await loadAssignment();
    } catch (err) {
      setQueryResult(null);
      setError(err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  const requestHint = async () => {
    if (!assignmentId) {
      return;
    }

    setIsHintLoading(true);
    setError('');

    try {
      const payload = await hintService.getHint({ assignmentId, query });
      setHintText(payload.hint || 'No hint available right now.');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsHintLoading(false);
    }
  };

  const recentAttempts = useMemo(() => attempts.slice(0, 10), [attempts]);

  return {
    assignment,
    query,
    setQuery,
    queryResult,
    hintText,
    isLoading,
    isExecuting,
    isHintLoading,
    error,
    executeQuery,
    requestHint,
    recentAttempts,
    reload: loadAssignment
  };
};
