import { useState } from 'react';

function AddMovie() {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    rating: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) 
      newErrors.title = 'Movie title is required';
    if (!formData.genre.trim()) 
      newErrors.genre = 'Genre is required';
    if (!formData.year || formData.year < 1900 || formData.year > 2026)
      newErrors.year = 'Enter a valid year between 1900 and 2026';
    if (!formData.rating || formData.rating < 1 || formData.rating > 10)
      newErrors.rating = 'Rating must be between 1 and 10';
    if (!formData.description.trim())
      newErrors.description = 'Description is required';
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
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-success">
          <h4>🎉 Movie Added Successfully!</h4>
          <p><strong>{formData.title}</strong> has been added!</p>
          <button
            className="btn btn-danger mt-2"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                title: '',
                genre: '',
                year: '',
                rating: '',
                description: '',
              });
            }}
          >
            ➕ Add Another Movie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center fw-bold mb-4">➕ Add a Movie</h2>

          <form onSubmit={handleSubmit}>

            {/* Title */}
            <div className="mb-3">
              <label className="form-label fw-bold">Movie Title</label>
              <input
                type="text"
                name="title"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                placeholder="e.g. The Dark Knight"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            {/* Genre */}
            <div className="mb-3">
              <label className="form-label fw-bold">Genre</label>
              <input
                type="text"
                name="genre"
                className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
                placeholder="e.g. Action, Comedy, Drama"
                value={formData.genre}
                onChange={handleChange}
              />
              {errors.genre && (
                <div className="invalid-feedback">{errors.genre}</div>
              )}
            </div>

            {/* Year */}
            <div className="mb-3">
              <label className="form-label fw-bold">Release Year</label>
              <input
                type="number"
                name="year"
                className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                placeholder="e.g. 2024"
                value={formData.year}
                onChange={handleChange}
              />
              {errors.year && (
                <div className="invalid-feedback">{errors.year}</div>
              )}
            </div>

            {/* Rating */}
            <div className="mb-3">
              <label className="form-label fw-bold">Rating (1-10)</label>
              <input
                type="number"
                name="rating"
                className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
                placeholder="e.g. 8"
                value={formData.rating}
                onChange={handleChange}
              />
              {errors.rating && (
                <div className="invalid-feedback">{errors.rating}</div>
              )}
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-bold">Description</label>
              <textarea
                name="description"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                placeholder="Write a short description..."
                rows="4"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>

            <button type="submit" className="btn btn-danger w-100">
              🎬 Submit Movie
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;