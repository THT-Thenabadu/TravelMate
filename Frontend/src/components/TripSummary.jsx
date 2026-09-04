import './TripSummary.css';

/**
 * TripSummary — displays a compact overview of the trip parameters.
 *
 * Props:
 *   trip — { startLocation, days, budget, interests[] }
 */
function TripSummary({ trip }) {
  const { startLocation, days, budget, interests } = trip;

  return (
    <div className="trip-summary" role="region" aria-label="Trip overview">
      <SummaryItem label="Starting Location" value={startLocation} />
      <SummaryItem
        label="Duration"
        value={`${days} ${days === 1 ? 'Day' : 'Days'}`}
      />
      <SummaryItem label="Interests" value={interests.join(', ')} />
      <SummaryItem
        label="Budget"
        value={`LKR ${budget.toLocaleString()}`}
      />
    </div>
  );
}

/** Small presentational helper — one label/value pair. */
function SummaryItem({ label, value }) {
  return (
    <div className="summary-item">
      <span className="summary-item__label">{label}</span>
      <span className="summary-item__value">{value}</span>
    </div>
  );
}

export default TripSummary;
