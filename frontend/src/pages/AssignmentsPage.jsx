import { useAssignments } from '../hooks/useAssignments';
import AssignmentCard from '../components/AssignmentCard.jsx';

const AssignmentsPage = () => {
  const { assignments, isLoading, error } = useAssignments();

  if (isLoading) {
    return (
      <div className="container">
        <p>Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error-text">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="page-header">
        <h1>CipherSQLStudio</h1>
        <p>Browse and attempt SQL assignments</p>
      </header>

      {assignments.length === 0 ? (
        <p>No assignments found. Seed the database via POST /api/assignments/seed</p>
      ) : (
        <section className="assignments-grid">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment._id} assignment={assignment} />
          ))}
        </section>
      )}
    </div>
  );
};

export default AssignmentsPage;
