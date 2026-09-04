import { useState } from 'react';
import './PreferenceForm.css';

const INTEREST_OPTIONS = ['Nature', 'Culture', 'Adventure', 'Food', 'Nightlife'];
const TRAVEL_STYLES = ['Backpacker', 'Mid-range', 'Luxury'];

function PreferenceForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    days: '',
    budget: '',
    startingLocation: '',
    interests: [],
    travelStyle: 'Mid-range',
  });

  const [errors, setErrors] = useState({});

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const alreadySelected = prev.interests.includes(interest);
      return {
        ...prev,
        interests: alreadySelected
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.days || Number(formData.days) <= 0) {
      newErrors.days = 'Enter how many days you\'ll be traveling (at least 1).';
    }

    if (!formData.budget || Number(formData.budget) <= 0) {
      newErrors.budget = 'Enter a budget greater than 0.';
    }

    if (!formData.startingLocation.trim()) {
      newErrors.startingLocation = 'Tell us where you\'re starting from.';
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Pick at least one interest.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="form-page">
      <button className="back-link" onClick={onBack}>&larr; Back</button>

      <h1>Plan your trip</h1>
      <p className="form-intro">Tell us the basics — we'll do the rest.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="days">Number of days</label>
          <input
            id="days"
            type="number"
            min="1"
            value={formData.days}
            onChange={(e) => setFormData({ ...formData, days: e.target.value })}
          />
          {errors.days && <span className="error">{errors.days}</span>}
        </div>

        <div className="field">
          <label htmlFor="budget">Total budget (USD)</label>
          <input
            id="budget"
            type="number"
            min="1"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          />
          {errors.budget && <span className="error">{errors.budget}</span>}
        </div>

        <div className="field">
          <label htmlFor="startingLocation">Starting location</label>
          <input
            id="startingLocation"
            type="text"
            placeholder="e.g. Colombo"
            value={formData.startingLocation}
            onChange={(e) =>
              setFormData({ ...formData, startingLocation: e.target.value })
            }
          />
          {errors.startingLocation && (
            <span className="error">{errors.startingLocation}</span>
          )}
        </div>

        <div className="field">
          <label>Interests</label>
          <div className="checkbox-group">
            {INTEREST_OPTIONS.map((interest) => (
              <label key={interest} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleInterestToggle(interest)}
                />
                {interest}
              </label>
            ))}
          </div>
          {errors.interests && <span className="error">{errors.interests}</span>}
        </div>

        <div className="field">
          <label>Travel style</label>
          <div className="radio-group">
            {TRAVEL_STYLES.map((style) => (
              <label key={style} className="radio-item">
                <input
                  type="radio"
                  name="travelStyle"
                  value={style}
                  checked={formData.travelStyle === style}
                  onChange={(e) =>
                    setFormData({ ...formData, travelStyle: e.target.value })
                  }
                />
                {style}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Generate my itinerary
        </button>
      </form>
    </div>
  );
}

export default PreferenceForm;