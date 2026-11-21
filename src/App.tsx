import { Navigate, Route, Routes } from 'react-router-dom';
import Hub from './hub/Hub';
import CourseApp from './course/CourseApp';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hub />} />
      <Route path="/:courseId" element={<CourseApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
