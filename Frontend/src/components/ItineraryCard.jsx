import './ItineraryCard.css';

/**
 * ItineraryCard — displays the details for a single day of the trip.
 *
 * Props:
 *   itinerary — {
 *     day, destination, description,
 *     activities[], transport, estimatedCost
 *   }
 */
function ItineraryCard({ itinerary }) {
  const { day, destination, description, activities, transport, estimatedCost } =
    itinerary;

  return (
    <article className="itinerary-card" aria-label={`Day ${day}: ${destination}`}>
      {/* Left: Day number badge */}
      <div className="itinerary-card__day-badge" aria-label={`Day ${day}`}>
        <span className="itinerary-card__day-label">Day</span>
        <span className="itinerary-card__day-number">{day}</span>
      </div>

      {/* Right: Content */}
      <div className="itinerary-card__content">
        <div className="itinerary-card__header">
          <h3 className="itinerary-card__destination">{destination}</h3>
          <span className="itinerary-card__cost">
            LKR {estimatedCost.toLocaleString()}
          </span>
        </div>

        <p className="itinerary-card__description">{description}</p>

        {/* Activities */}
        <div className="itinerary-card__section">
          <span className="itinerary-card__section-title">Activities</span>
          <ul className="itinerary-card__activities">
            {activities.map((activity) => (
              <li key={activity} className="itinerary-card__activity-item">
                {activity}
              </li>
            ))}
          </ul>
        </div>

        {/* Transport */}
        <div className="itinerary-card__section">
          <span className="itinerary-card__section-title">Transport</span>
          <span className="itinerary-card__transport-badge">{transport}</span>
        </div>
      </div>
    </article>
  );
}

export default ItineraryCard;
