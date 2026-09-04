import { useState } from 'react';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  // Tracks which "page" is showing: 'landing' | 'form' | 'results'
  const [currentPage, setCurrentPage] = useState('landing');
  const [preferences, setPreferences] = useState(null);

  const handleGetStarted = () => {
    setCurrentPage('form');
  };

  const handleFormSubmit = (formData) => {
    setPreferences(formData);
    setCurrentPage('results');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="app">
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={handleGetStarted} />
      )}
    </div>
  );
}

export default App;