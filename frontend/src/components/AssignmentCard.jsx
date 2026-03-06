import { Link } from 'react-router-dom';

const AssignmentCard = ({ assignment }) => {
  return (
    <article className="assignment-card">
      <header className="assignment-card__header">
        <h3 className="assignment-card__title">{assignment.title}</h3>
        <span className={`badge badge-${assignment.difficulty}`}>
          {assignment.difficulty}
        </span>
      </header>
      <p className="assignment-card__description">
        {assignment.shortDescription || assignment.description}
      </p>
      <Link to={`/assignment/${assignment._id}`} className="primary-btn assignment-card__button">
        Start Assignment
      </Link>
    </article>
  );
};

export default AssignmentCard;
