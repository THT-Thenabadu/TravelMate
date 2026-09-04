import mockItinerary from './data/mockItinerary'
import Results from './pages/Results'

/**
 * App — root component.
 *
 * Currently renders the ItineraryResults page using mock data.
 *
 * Integration note:
 *   When the itinerary-planner feature is ready, replace `mockItinerary`
 *   with the real data source and pass it to <Results tripData={...} />.
 *   The Results component and its children need no internal changes.
 */
function App() {
  // Placeholder: in the final integration this would navigate back to the
  // preference form. For now it just logs so the button is functional.
  function handleBack() {
    console.log('Navigate back to the planner / preferences form.')
  }

  return (
    <Results
      tripData={mockItinerary}
      onBack={handleBack}
    />
  )
}

export default App
