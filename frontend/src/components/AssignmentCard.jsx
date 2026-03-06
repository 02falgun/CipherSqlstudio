import { Link } from 'react-router-dom';

const AssignmentCard = ({ assignment }) => {
  return (
    <article className="assignment-card">
      <header>
        <h3>{assignment.title}</h3>
        <span className={`badge badge-${assignment.difficulty}`}>
          {assignment.difficulty}
        </span>
      </header>
      <p>{assignment.description}</p>
      <Link to={`/assignments/${assignment._id}`} className="primary-btn">
        Start Attempt
      </Link>
    </article>
  );
};

export default AssignmentCard;
