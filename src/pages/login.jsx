import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim())
      newErrors.username = 'Username is required';

    if (isRegister && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (isRegister && !formData.email.includes('@')) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    navigate('/home');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#141414',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="card p-4 shadow"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h2 className="text-center mb-1" style={{ color: '#e50914' }}>
          🎬 Movie Explorer
        </h2>
        <p className="text-center text-muted mb-4">
          {isRegister ? 'Create your account' : 'Welcome back!'}
        </p>

        <form onSubmit={handleSubmit}>

          {/* Username - always shown */}
          <div className="mb-3">
            <label className="form-label fw-bold">Username</label>
            <input
              type="text"
              name="username"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="e.g. francisco123"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          {/* Email - only on Register */}
          {isRegister && (
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="text"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="e.g. francisco@email.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
          )}

          {/* Password - always shown */}
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-danger w-100 mb-3">
            {isRegister ? '📝 Register' : '🔐 Login'}
          </button>

          <p className="text-center text-muted">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <span
              onClick={() => {
                setIsRegister(!isRegister);
                setErrors({});
                setFormData({ username: '', email: '', password: '' });
              }}
              style={{ color: '#e50914', cursor: 'pointer', marginLeft: '5px' }}
            >
              {isRegister ? 'Login' : 'Register'}
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;