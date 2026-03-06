import { Navigate, Route, Routes } from 'react-router-dom';

import AssignmentsPage from './pages/AssignmentsPage.jsx';
import AssignmentAttemptPage from './pages/AssignmentAttemptPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AssignmentsPage />} />
      <Route path="/assignment/:id" element={<AssignmentAttemptPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
