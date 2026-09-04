import './Itinerary.css';

function Itinerary({ itinerary, onStartOver, submitError }) {
  const { preferences, selected, days, totalEstimatedCost, withinBudget } = itinerary;
  const interestLabel = preferences.interests.join(' / ');

  return (
    <main className="itinerary-page">
      <header className="itinerary-header">
        <div>
          <button className="back-link" onClick={onStartOver}>&larr; Adjust preferences</button>
          <p className="eyebrow">Your TravelMate route</p>
          <h1>{preferences.days}-day trip, shaped around {interestLabel.toLowerCase()}.</h1>
          <p className="itinerary-intro">
            A practical route from {preferences.startingLocation}, tuned for a {preferences.travelStyle.toLowerCase()} pace.
          </p>
        </div>
        <div className="route-stamp" aria-label="Trip summary">
          <span>{selected.length} stops</span>
          <strong>{withinBudget ? 'On budget' : 'Budget stretch'}</strong>
        </div>
      </header>

      {submitError && <p className="save-note">{submitError}</p>}

      <section className="trip-summary">
        <div><span>Starting from</span><strong>{preferences.startingLocation}</strong></div>
        <div><span>Estimated spend</span><strong>${totalEstimatedCost.toLocaleString()}</strong></div>
        <div><span>Your budget</span><strong>${Number(preferences.budget).toLocaleString()}</strong></div>
      </section>

      <section className="route-overview" aria-label="Selected destinations">
        <p className="section-kicker">The route</p>
        <div className="route-line">
          {selected.map((destination, index) => (
            <div className="route-stop" key={destination.name}>
              <span className="route-number">0{index + 1}</span>
              <strong>{destination.name}</strong>
              <span>{destination.region}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="day-list">
        <div className="section-heading">
          <p className="section-kicker">Day by day</p>
          <h2>A route with room to breathe.</h2>
        </div>
        {days.map(({ day, destination, transport, cost, focus }) => (
          <article className="day-card" key={day}>
            <div className="day-number">{String(day).padStart(2, '0')}</div>
            <div className="day-content">
              <div className="day-title-row">
                <div>
                  <p className="day-label">Day {day} / {destination.region}</p>
                  <h3>{destination.name}</h3>
                </div>
                <span className="day-cost">~${cost}</span>
              </div>
              <p>{destination.description}</p>
              <div className="day-details">
                <span><b>Plan</b>{focus}</span>
                <span><b>Getting there</b>{transport}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer className="itinerary-footer">
        <p>Built from your interests, pace, starting point, and budget.</p>
        <button className="btn-primary" onClick={onStartOver}>Plan another trip</button>
      </footer>
    </main>
  );
}

export default Itinerary;