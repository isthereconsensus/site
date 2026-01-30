import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DisciplinePage from './pages/DisciplinePage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import FeedbackPage from './pages/FeedbackPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path=":discipline" element={<DisciplinePage />} />
          <Route path="question/:id" element={<QuestionDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
