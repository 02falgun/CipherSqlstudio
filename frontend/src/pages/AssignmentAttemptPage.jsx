import { Link, useParams } from 'react-router-dom';

import { useAssignmentAttempt } from '../hooks/useAssignmentAttempt';
import QuestionPanel from '../components/QuestionPanel.jsx';
import SampleDataViewer from '../components/SampleDataViewer.jsx';
import SQLEditor from '../components/SQLEditor.jsx';
import QueryResults from '../components/QueryResults.jsx';
import HintPanel from '../components/HintPanel.jsx';

const AssignmentAttemptPage = () => {
  const { id } = useParams();
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
    requestHint
  } = useAssignmentAttempt(id);

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
        <span className={`badge badge-${assignment.difficulty}`}>{assignment.difficulty}</span>
      </header>

      <QuestionPanel description={assignment.question || assignment.description} />

      <SampleDataViewer
        tableSchemas={assignment.tableSchemas}
        sampleData={assignment.sampleData}
      />

      <SQLEditor
        value={query}
        onQueryChange={setQuery}
        height="360px"
        defaultQuery="SELECT * FROM students LIMIT 10;"
      />

      <div className="actions">
        <button className="primary-btn" onClick={executeQuery} disabled={isExecuting}>
          {isExecuting ? 'Executing...' : 'Execute Query'}
        </button>
      </div>

      <HintPanel hintText={hintText} isLoading={isHintLoading} onRequestHint={requestHint} />

      {error && <p className="error-text">{error}</p>}

      <QueryResults result={queryResult} />
    </div>
  );
};

export default AssignmentAttemptPage;
