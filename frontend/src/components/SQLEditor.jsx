import Editor from '@monaco-editor/react';

const SQLEditor = ({ value, onChange }) => {
  return (
    <section className="panel">
      <h3>SQL Editor</h3>
      <Editor
        height="320px"
        language="sql"
        theme="vs-dark"
        value={value}
        onChange={(newValue) => onChange(newValue || '')}
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
