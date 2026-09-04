import { useState } from 'react';
import LandingPage from './components/LandingPage';
import PreferenceForm from './components/PreferenceForm';
import './App.css';

function App() {
  // Tracks which "page" is showing: 'landing' | 'form'
  const [currentPage, setCurrentPage] = useState('landing');

  const handleGetStarted = () => {
    setCurrentPage('form');
  };

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // Itinerary results page isn't built yet — logging for now
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
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
        />
      )}
    </div>
  );
}

export default App;