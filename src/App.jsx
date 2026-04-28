import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import AddMovie from './pages/AddMovie';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page - no Navbar */}
        <Route path="/" element={<Login />} />

        {/* All other pages - with Navbar */}
        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/list" element={<><Navbar /><MovieList /></>} />
        <Route path="/details/:id" element={<><Navbar /><MovieDetails /></>} />
        <Route path="/add" element={<><Navbar /><AddMovie /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
