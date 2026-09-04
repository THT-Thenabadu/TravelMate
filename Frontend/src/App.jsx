import { useState } from 'react';
import LandingPage from './components/LandingPage';
import PreferenceForm from './components/PreferenceForm';
import Itinerary from './components/Itinerary';
import { generateItinerary } from './services/itineraryPlanner';
import './App.css';

function App() {
  // Tracks which "page" is showing: 'landing' | 'form'
  const [currentPage, setCurrentPage] = useState('landing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [itinerary, setItinerary] = useState(null);

  const handleGetStarted = () => {
    setCurrentPage('form');
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError('');
    const generatedItinerary = generateItinerary(formData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/preferences`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            days: Number(formData.days),
            budget: Number(formData.budget),
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Unable to save your preferences.');
      }

      setItinerary(generatedItinerary);
      setCurrentPage('itinerary');
    } catch (error) {
      setItinerary(generatedItinerary);
      setSubmitError(`Your itinerary is ready. Preferences could not be saved: ${error.message || 'backend unavailable'}`);
      setCurrentPage('itinerary');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setSubmitError('');
  };

  return (
    <div className="app">
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}

      {currentPage === 'form' && (
        <PreferenceForm
          onSubmit={handleFormSubmit}
          onBack={handleBackToLanding}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )}

      {currentPage === 'itinerary' && itinerary && (
        <Itinerary
          itinerary={itinerary}
          onStartOver={() => {
            setCurrentPage('form');
            setSubmitError('');
          }}
          submitError={submitError}
        />
      )}
    </div>
  );
}

export default App;