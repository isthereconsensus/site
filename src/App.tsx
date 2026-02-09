import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DisciplinePage from './pages/DisciplinePage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import FeedbackPage from './pages/FeedbackPage';
import PlasmicHostPage from './pages/PlasmicHostPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Plasmic host route: must NOT be under Layout */}
        <Route path="/plasmic-host" element={<PlasmicHostPage />} />

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

