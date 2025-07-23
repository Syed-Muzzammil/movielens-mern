import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import MovieDetails from './pages/MovieDetails'; // ✅ Import this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movie/:id" element={<MovieDetails />} /> {/* ✅ Add this */}
      </Routes>
    </Router>
  );
}

export default App;
