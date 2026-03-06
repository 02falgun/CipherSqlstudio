import SQLResultsTable from './SQLResultsTable.jsx';

const formatSchemaColumns = (schema) => {
  const columns = Array.isArray(schema?.columns) ? schema.columns : [];

  return columns.map((column) => {
    if (typeof column === 'string') {
      return column;
    }

    if (column?.name && column?.type) {
      return `${column.name} (${column.type})`;
    }

    return JSON.stringify(column);
  });
};

const SampleDataViewer = ({ tableSchemas, sampleData }) => {
  const schemas = Array.isArray(tableSchemas) ? tableSchemas : [];
  const samples = Array.isArray(sampleData) ? sampleData : [];

  return (
    <section className="panel">
      <h3>Sample Data Viewer</h3>

      {schemas.length === 0 ? (
        <p>No table schemas available.</p>
      ) : (
        <div className="data-viewer__block">
          <h4>Table Schemas</h4>
          <ul className="data-viewer__list">
            {schemas.map((schema, index) => (
              <li key={schema.tableName || schema.name || index}>
                <strong>{schema.tableName || schema.name || `Table ${index + 1}`}</strong>
                <span>{formatSchemaColumns(schema).join(', ')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {samples.length === 0 ? (
        <p>No sample rows available.</p>
      ) : (
        <div className="data-viewer__block">
          <h4>Sample Rows</h4>
          {samples.map((tableSample, index) => {
            const title = tableSample?.tableName || tableSample?.name || `Table ${index + 1}`;
            const rows = Array.isArray(tableSample?.rows)
              ? tableSample.rows
              : Array.isArray(tableSample)
                ? tableSample
                : [];

            return (
              <div className="data-viewer__table" key={`${title}-${index}`}>
                <h5>{title}</h5>
                <SQLResultsTable rows={rows} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SampleDataViewer;
