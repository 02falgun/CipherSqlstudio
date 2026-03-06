import SQLResultsTable from './SQLResultsTable.jsx';

const normalizeRows = (result) => {
  if (!result) {
    return [];
  }

  if (Array.isArray(result)) {
    return result;
  }

  if (Array.isArray(result.data)) {
    return result.data;
  }

  if (Array.isArray(result.rows) && Array.isArray(result.columns)) {
    return result.rows.map((row) => {
      return result.columns.reduce((accumulator, column, index) => {
        accumulator[column] = row[index];
        return accumulator;
      }, {});
    });
  }

  return [];
};

const QueryResults = ({ result }) => {
  if (!result) {
    return (
      <section className="panel">
        <h3>Query Results</h3>
        <p>No results yet. Execute a query to see output.</p>
      </section>
    );
  }

  const rows = normalizeRows(result);
  const rowCount = result?.rowCount ?? rows.length;
  const executionTime = result?.executionTimeMs;

  return (
    <section className="panel">
      <h3>Query Results</h3>
      <p>
        {rowCount} rows{typeof executionTime === 'number' ? ` • ${executionTime} ms` : ''}
      </p>
      <SQLResultsTable rows={rows} />
    </section>
  );
};

export default QueryResults;
