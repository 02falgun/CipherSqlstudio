const HintPanel = ({ hintText, isLoading, onRequestHint }) => {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>LLM Hint</h3>
        <button className="secondary-btn" onClick={onRequestHint} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Get Hint'}
        </button>
      </div>
      <p>{hintText || 'Ask for a hint when you are stuck.'}</p>
    </section>
  );
};

export default HintPanel;
