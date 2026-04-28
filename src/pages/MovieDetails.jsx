import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovieDetails();
  }, [id]);

  const loadMovieDetails = async () => {
    setLoading(true);
    const data = await getMovieDetails(id);
    setMovie(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      {/* Back Button */}
      <button
        className="btn btn-outline-danger mb-4"
        onClick={() => navigate('/list')}
      >
        ← Back to Movies
      </button>

      <div className="row">

        {/* Movie Poster */}
        <div className="col-md-4">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image'
            }
            alt={movie.title}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Movie Info */}
        <div className="col-md-8">
          <h2 className="fw-bold">{movie.title}</h2>
          <p className="text-muted">{movie.tagline}</p>

          <div className="d-flex gap-3 mb-3">
            <span className="badge bg-danger fs-6">
               {movie.vote_average?.toFixed(1)}
            </span>
            <span className="badge bg-secondary fs-6">
               {movie.release_date?.split('-')[0]}
            </span>
            <span className="badge bg-dark fs-6">
               {movie.runtime} min
            </span>
          </div>

          {/* Genres */}
          <div className="mb-3">
            {movie.genres?.map(genre => (
              <span
                key={genre.id}
                className="badge bg-outline-danger border border-danger text-danger me-2"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <h5 className="fw-bold mt-3"> Overview</h5>
          <p className="text-muted">{movie.overview}</p>

          {/* Extra Info */}
          <h5 className="fw-bold mt-3">ℹ️ Details</h5>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td><strong>Original Language</strong></td>
                <td>{movie.original_language?.toUpperCase()}</td>
              </tr>
              <tr>
                <td><strong>Budget</strong></td>
                <td>${movie.budget?.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Revenue</strong></td>
                <td>${movie.revenue?.toLocaleString()}</td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td>{movie.status}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default MovieDetails;