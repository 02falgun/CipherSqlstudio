const QuestionPanel = ({ description }) => {
  return (
    <section className="panel">
      <h3>Question</h3>
      <p>{description || 'No assignment description available.'}</p>
    </section>
  );
};

export default QuestionPanel;
