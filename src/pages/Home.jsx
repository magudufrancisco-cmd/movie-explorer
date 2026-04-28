import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center text-center">
        <div className="col-md-8">

          {/* Hero Section */}
          <h1 className="display-4 fw-bold mb-3">
            🎬 Welcome to Movie Explorer
          </h1>
          <p className="lead text-muted mb-4">
            Discover popular movies, search your favourites,
            explore details and more — all in one place!
          </p>

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-danger btn-lg"
              onClick={() => navigate('/list')}
            >
               Browse Movies
            </button>
            <button
              className="btn btn-outline-dark btn-lg"
              onClick={() => navigate('/add')}
            >
              ➕ Add Movie
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;