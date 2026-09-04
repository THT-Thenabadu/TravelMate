import './Results.css';
import TripSummary from '../components/TripSummary';
import ItineraryCard from '../components/ItineraryCard';
import TransportInfo from '../components/TransportInfo';
import BudgetSummary from '../components/BudgetSummary';

/**
 * Results page — assembles all itinerary UI components.
 *
 * Props:
 *   tripData  — object matching the shape of mockItinerary:
 *               { tripSummary, itinerary, totalEstimatedCost }
 *   onBack    — callback for the "Back to Planner" / "Edit Preferences" action
 *
 * When the real planner is integrated, pass its output as `tripData` instead
 * of the mock data. No changes to this component or its children are needed.
 */
function Results({ tripData, onBack }) {
  const { tripSummary, itinerary, totalEstimatedCost } = tripData;

  return (
    <div className="results-page">
      {/* ── PAGE HEADER ── */}
      <header className="results-header">
        <div className="results-header__accent" aria-hidden="true"></div>
        <h1 className="results-header__title">Your Sri Lanka Adventure</h1>
        <p className="results-header__subtitle">
          A travel plan created around your preferences
        </p>
      </header>

      <main className="results-main">
        {/* ── TRIP SUMMARY ── */}
        <section aria-labelledby="trip-summary-heading">
          <h2 id="trip-summary-heading" className="section-heading">
            Trip Overview
          </h2>
          <TripSummary trip={tripSummary} />
        </section>

        {/* ── DAY-BY-DAY ITINERARY ── */}
        <section aria-labelledby="itinerary-heading">
          <h2 id="itinerary-heading" className="section-heading">
            Day-by-Day Itinerary
          </h2>

          <div className="itinerary-timeline">
            {itinerary.map((item, index) => (
              <div key={item.day} className="itinerary-timeline__entry">
                {/* Day card */}
                <ItineraryCard itinerary={item} />

                {/* Transport connector between days (not after last card) */}
                {index < itinerary.length - 1 && (
                  <TransportInfo
                    from={item.destination}
                    to={itinerary[index + 1].destination}
                    transport={itinerary[index + 1].transport}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── BUDGET SUMMARY ── */}
        <section aria-labelledby="budget-heading">
          <h2 id="budget-heading" className="section-heading">
            Budget Summary
          </h2>
          <BudgetSummary
            budget={tripSummary.budget}
            estimatedCost={totalEstimatedCost}
          />
        </section>

        {/* ── ACTIONS ── */}
        <div className="results-actions">
          <button
            id="btn-edit-preferences"
            type="button"
            className="btn btn--secondary"
            onClick={onBack}
          >
            Edit Preferences
          </button>
          <button
            id="btn-back-to-planner"
            type="button"
            className="btn btn--primary"
            onClick={onBack}
          >
            Back to Planner
          </button>
        </div>
      </main>
    </div>
  );
}

export default Results;
