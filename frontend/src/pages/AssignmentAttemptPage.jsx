import { Link, useParams } from 'react-router-dom';

import { useAssignmentAttempt } from '../hooks/useAssignmentAttempt';
import SQLEditor from '../components/SQLEditor.jsx';
import QueryResults from '../components/QueryResults.jsx';
import HintPanel from '../components/HintPanel.jsx';
import AttemptHistory from '../components/AttemptHistory.jsx';

const AssignmentAttemptPage = () => {
  const { assignmentId } = useParams();
  const {
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
    recentAttempts
  } = useAssignmentAttempt(assignmentId);

  if (isLoading) {
    return (
      <div className="container">
        <p>Loading assignment...</p>
      </div>
    );
  }

  if (error && !assignment) {
    return (
      <div className="container">
        <p className="error-text">Error: {error}</p>
        <Link to="/" className="secondary-btn">
          Back to Assignments
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="page-header">
        <Link to="/" className="back-link">
          ← Back to Assignments
        </Link>
        <h1>{assignment.title}</h1>
        <p>{assignment.description}</p>
        <span className={`badge badge-${assignment.difficulty}`}>{assignment.difficulty}</span>
      </header>

      <SQLEditor value={query} onChange={setQuery} />

      <div className="actions">
        <button className="primary-btn" onClick={executeQuery} disabled={isExecuting}>
          {isExecuting ? 'Executing...' : 'Run Query'}
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      <QueryResults result={queryResult} />

      <HintPanel hintText={hintText} isLoading={isHintLoading} onRequestHint={requestHint} />

      <AttemptHistory attempts={recentAttempts} />
    </div>
  );
};

export default AssignmentAttemptPage;
