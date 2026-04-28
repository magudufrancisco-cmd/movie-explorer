import { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies, getGenres } from '../services/api';
import MovieCard from '../components/MovieCard';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPopularMovies();
    loadGenres();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    const data = await getPopularMovies();
    setMovies(data);
    setLoading(false);
  };

  const loadGenres = async () => {
    const data = await getGenres();
    setGenres(data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      loadPopularMovies();
      return;
    }
    setLoading(true);
    const data = await searchMovies(search);
    setMovies(data);
    setLoading(false);
  };

  const filteredMovies = selectedGenre
    ? movies.filter(movie =>
        movie.genre_ids.includes(Number(selectedGenre))
      )
    : movies;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🎬 Movie Explorer</h2>

      {/* Search and Filter Bar */}
      <form onSubmit={handleSearch} className="row g-2 mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-danger w-100">
            Search
          </button>
        </div>
      </form>

      {/* Movies Grid */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {filteredMovies.map(movie => (
            <div className="col-md-3 col-sm-6 mb-4" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;