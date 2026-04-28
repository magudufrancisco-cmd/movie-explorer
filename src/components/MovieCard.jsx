import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const imagePath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div
      className="card h-100 shadow"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/details/${movie.id}`)}
    >
      <img
        src={imagePath}
        className="card-img-top"
        alt={movie.title}
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-bold">{movie.title}</h6>
        <p className="text-muted small mb-1">
           {movie.release_date?.split('-')[0] || 'N/A'}
        </p>
        <div className="mt-auto">
          <span className="badge bg-danger">
             {movie.vote_average?.toFixed(1) || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;