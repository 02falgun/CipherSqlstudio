const QueryResults = ({ result }) => {
  if (!result) {
    return (
      <section className="panel">
        <h3>Query Results</h3>
        <p>No results yet. Execute a query to see output.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <h3>Query Results</h3>
      <p>
        {result.rowCount} rows • {result.executionTimeMs} ms
      </p>
      <div className="result-table-wrapper">
        <table className="result-table">
          <thead>
            <tr>
              {result.columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <td key={`${rowIndex}-${columnIndex}`}>{String(cell ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default QueryResults;
