const AttemptHistory = ({ attempts }) => {
  return (
    <section className="panel">
      <h3>Recent Attempts</h3>
      {attempts.length === 0 ? (
        <p>No attempts yet.</p>
      ) : (
        <ul className="attempt-list">
          {attempts.map((attempt) => (
            <li key={attempt._id}>
              <strong>{attempt.wasSuccessful ? 'Success' : 'Failed'}</strong>
              <span>{new Date(attempt.createdAt).toLocaleString()}</span>
              {!attempt.wasSuccessful && attempt.errorMessage ? (
                <small>{attempt.errorMessage}</small>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default AttemptHistory;
