import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateQuizPage from './pages/CreateQuizPage';
import TakeQuizPage from './pages/TakeQuizPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <div className="container">
      <nav className="nav">
        <Link to="/" className="logo">QuizMaster</Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link to="/create" className="btn-primary" style={{ textDecoration: 'none', padding: '8px 16px', fontSize: '0.9rem' }}>Create Quiz</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateQuizPage />} />
        <Route path="/quiz/:id" element={<TakeQuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

export default App;
