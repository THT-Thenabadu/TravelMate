import './TransportInfo.css';

/**
 * TransportInfo — displays a transport connector between two destinations.
 *
 * Placed between ItineraryCards in the timeline to show how the traveller
 * gets from one destination to the next.
 *
 * Props:
 *   from      — name of the departure destination
 *   to        — name of the arrival destination
 *   transport — mode of transport (e.g. "Train", "Bus")
 */
function TransportInfo({ from, to, transport }) {
  return (
    <div className="transport-info" aria-label={`Travel from ${from} to ${to} by ${transport}`}>
      {/* Vertical line connecting the cards */}
      <div className="transport-info__line" aria-hidden="true"></div>

      {/* Transport pill */}
      <div className="transport-info__pill">
        <span className="transport-info__route">
          {from} → {to}
        </span>
        <span className="transport-info__mode">{transport}</span>
      </div>

      {/* Vertical line continuing down */}
      <div className="transport-info__line" aria-hidden="true"></div>
    </div>
  );
}

export default TransportInfo;
