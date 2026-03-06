const getColumns = (rows) => {
  const columns = [];

  for (const row of rows) {
    for (const key of Object.keys(row || {})) {
      if (!columns.includes(key)) {
        columns.push(key);
      }
    }
  }

  return columns;
};

const SQLResultsTable = ({ rows }) => {
  const safeRows = Array.isArray(rows) ? rows : [];

  if (safeRows.length === 0) {
    return <p>No rows returned.</p>;
  }

  const columns = getColumns(safeRows);

  return (
    <div className="result-table-wrapper">
      <table className="result-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safeRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={`${rowIndex}-${column}`}>{String(row?.[column] ?? '')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SQLResultsTable;
