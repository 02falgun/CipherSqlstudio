import { Assignment } from '../models/Assignment.js';

const seedData = [
  {
    title: 'Find Top Performing Students',
    description:
      'Return top 5 students with highest average score. Include student_id, full_name, average_score.',
    starterQuery: 'SELECT student_id, full_name, AVG(score) AS average_score FROM exam_scores GROUP BY student_id, full_name ORDER BY average_score DESC LIMIT 5;',
    expectedConcepts: ['GROUP BY', 'AVG', 'ORDER BY', 'LIMIT'],
    difficulty: 'easy'
  },
  {
    title: 'Department Enrollment Summary',
    description:
      'Show each department name with total enrolled students. Order descending by enrollment count.',
    starterQuery: 'SELECT d.name, COUNT(e.student_id) AS total_enrolled FROM departments d JOIN enrollments e ON e.department_id = d.id GROUP BY d.name ORDER BY total_enrolled DESC;',
    expectedConcepts: ['JOIN', 'COUNT', 'GROUP BY'],
    difficulty: 'medium'
  },
  {
    title: 'Recent High-Scoring Attempts',
    description:
      'List all assignment attempts in the last 7 days with score above 90, including student and assignment title.',
    starterQuery: "SELECT s.full_name, a.title, at.score, at.submitted_at FROM attempts at JOIN students s ON s.id = at.student_id JOIN assignments a ON a.id = at.assignment_id WHERE at.submitted_at >= NOW() - INTERVAL '7 days' AND at.score > 90 ORDER BY at.submitted_at DESC;",
    expectedConcepts: ['JOIN', 'WHERE', 'INTERVAL', 'ORDER BY'],
    difficulty: 'hard'
  }
];

export const listAssignments = async () => {
  return Assignment.find().sort({ createdAt: -1 }).lean();
};

export const getAssignmentById = async (assignmentId) => {
  return Assignment.findById(assignmentId).lean();
};

export const seedAssignments = async () => {
  const existing = await Assignment.countDocuments();
  if (existing > 0) {
    return { inserted: 0, skipped: true };
  }

  const inserted = await Assignment.insertMany(seedData);
  return { inserted: inserted.length, skipped: false };
};
