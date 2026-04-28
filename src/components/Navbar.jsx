import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🎬 Movie Explorer
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/list">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">Add Movie</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;