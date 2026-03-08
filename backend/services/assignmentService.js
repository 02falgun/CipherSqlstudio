import { Assignment } from '../models/Assignment.js';

const buildShortDescription = (assignment) => {
  const source = assignment.shortDescription || assignment.description || assignment.question || '';
  const trimmed = source.trim();

  if (trimmed.length <= 140) {
    return trimmed;
  }

  return `${trimmed.slice(0, 137)}...`;
};

const buildRequirements = (assignment) => {
  if (Array.isArray(assignment.requirements) && assignment.requirements.length > 0) {
    return assignment.requirements;
  }

  if (Array.isArray(assignment.expectedConcepts) && assignment.expectedConcepts.length > 0) {
    return assignment.expectedConcepts;
  }

  return [];
};

const seedData = [
  {
    title: 'Find Top Performing Students',
    description:
      'Return top 5 students with highest average score. Include student_id, full_name, average_score.',
    starterQuery: 'SELECT student_id, full_name, AVG(score) AS average_score FROM exam_scores GROUP BY student_id, full_name ORDER BY average_score DESC LIMIT 5;',
    expectedConcepts: ['GROUP BY', 'AVG', 'ORDER BY', 'LIMIT'],
    difficulty: 'easy',
    tableSchemas: [
      {
        tableName: 'exam_scores',
        columns: [
          { name: 'student_id', type: 'INTEGER' },
          { name: 'full_name', type: 'VARCHAR(100)' },
          { name: 'score', type: 'DECIMAL(5,2)' }
        ]
      }
    ],
    sampleData: [
      {
        tableName: 'exam_scores',
        rows: [
          { student_id: 1, full_name: 'Alice Johnson', score: 95.5 },
          { student_id: 2, full_name: 'Bob Smith', score: 87.3 },
          { student_id: 3, full_name: 'Carol White', score: 92.1 }
        ]
      }
    ]
  },
  {
    title: 'Department Enrollment Summary',
    description:
      'Show each department name with total enrolled students. Order descending by enrollment count.',
    starterQuery: 'SELECT d.name, COUNT(e.student_id) AS total_enrolled FROM departments d JOIN enrollments e ON e.department_id = d.id GROUP BY d.name ORDER BY total_enrolled DESC;',
    expectedConcepts: ['JOIN', 'COUNT', 'GROUP BY'],
    difficulty: 'medium',
    tableSchemas: [
      {
        tableName: 'departments',
        columns: [
          { name: 'id', type: 'INTEGER' },
          { name: 'name', type: 'VARCHAR(100)' }
        ]
      },
      {
        tableName: 'enrollments',
        columns: [
          { name: 'id', type: 'INTEGER' },
          { name: 'department_id', type: 'INTEGER' },
          { name: 'student_id', type: 'INTEGER' }
        ]
      }
    ],
    sampleData: [
      {
        tableName: 'departments',
        rows: [
          { id: 1, name: 'Computer Science' },
          { id: 2, name: 'Mathematics' },
          { id: 3, name: 'Physics' }
        ]
      },
      {
        tableName: 'enrollments',
        rows: [
          { id: 1, department_id: 1, student_id: 1 },
          { id: 2, department_id: 1, student_id: 2 },
          { id: 3, department_id: 2, student_id: 3 }
        ]
      }
    ]
  },
  {
    title: 'Recent High-Scoring Attempts',
    description:
      'List all assignment attempts in the last 7 days with score above 90, including student and assignment title.',
    starterQuery: "SELECT s.full_name, a.title, at.score, at.submitted_at FROM attempts at JOIN students s ON s.id = at.student_id JOIN assignments a ON a.id = at.assignment_id WHERE at.submitted_at >= NOW() - INTERVAL '7 days' AND at.score > 90 ORDER BY at.submitted_at DESC;",
    expectedConcepts: ['JOIN', 'WHERE', 'INTERVAL', 'ORDER BY'],
    difficulty: 'hard',
    tableSchemas: [
      {
        tableName: 'students',
        columns: [
          { name: 'id', type: 'INTEGER' },
          { name: 'full_name', type: 'VARCHAR(100)' }
        ]
      },
      {
        tableName: 'assignments',
        columns: [
          { name: 'id', type: 'INTEGER' },
          { name: 'title', type: 'VARCHAR(200)' }
        ]
      },
      {
        tableName: 'attempts',
        columns: [
          { name: 'id', type: 'INTEGER' },
          { name: 'student_id', type: 'INTEGER' },
          { name: 'assignment_id', type: 'INTEGER' },
          { name: 'score', type: 'DECIMAL(5,2)' },
          { name: 'submitted_at', type: 'TIMESTAMP' }
        ]
      }
    ],
    sampleData: [
      {
        tableName: 'students',
        rows: [
          { id: 1, full_name: 'Alice Johnson' },
          { id: 2, full_name: 'Bob Smith' }
        ]
      },
      {
        tableName: 'assignments',
        rows: [
          { id: 1, title: 'Basic SELECT' },
          { id: 2, title: 'JOIN Tutorial' }
        ]
      },
      {
        tableName: 'attempts',
        rows: [
          { id: 1, student_id: 1, assignment_id: 1, score: 95.0, submitted_at: '2026-03-07T10:30:00' },
          { id: 2, student_id: 2, assignment_id: 2, score: 91.5, submitted_at: '2026-03-06T14:15:00' }
        ]
      }
    ]
  }
];

export const listAssignments = async () => {
  const assignments = await Assignment.find().sort({ createdAt: -1 }).lean();

  return assignments.map((assignment) => ({
    _id: assignment._id,
    title: assignment.title,
    difficulty: assignment.difficulty,
    shortDescription: buildShortDescription(assignment),
    description: buildShortDescription(assignment)
  }));
};

export const getAssignmentById = async (assignmentId) => {
  const assignment = await Assignment.findById(assignmentId).lean();

  if (!assignment) {
    return null;
  }

  return {
    _id: assignment._id,
    title: assignment.title,
    difficulty: assignment.difficulty,
    question: assignment.question || assignment.description || '',
    requirements: buildRequirements(assignment),
    tableSchemas: assignment.tableSchemas || [],
    sampleData: assignment.sampleData || [],
    description: assignment.description || assignment.question || '',
    starterQuery: assignment.starterQuery || 'SELECT * FROM students LIMIT 10;'
  };
};

export const seedAssignments = async ({ force = false } = {}) => {
  const existing = await Assignment.countDocuments();
  if (existing > 0 && !force) {
    return { inserted: 0, skipped: true };
  }

  if (force) {
    await Assignment.deleteMany({});
  }

  const inserted = await Assignment.insertMany(seedData);
  return { inserted: inserted.length, skipped: false };
};
