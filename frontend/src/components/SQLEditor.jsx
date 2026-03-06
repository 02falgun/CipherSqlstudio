import Editor from '@monaco-editor/react';

const defaultTemplateQuery = 'SELECT * FROM students LIMIT 10;';

const SQLEditor = ({
  value,
  onChange,
  onQueryChange,
  height = '320px',
  defaultQuery = defaultTemplateQuery
}) => {
  const currentValue = value || defaultQuery;

  const handleChange = (newValue) => {
    const nextValue = newValue || '';

    if (typeof onChange === 'function') {
      onChange(nextValue);
    }

    if (typeof onQueryChange === 'function') {
      onQueryChange(nextValue);
    }
  };

  return (
    <section className="panel">
      <h3>SQL Editor</h3>
      <Editor
        height={height}
        language="sql"
        theme="vs-dark"
        value={currentValue}
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true
        }}
      />
    </section>
  );
};

export default SQLEditor;
