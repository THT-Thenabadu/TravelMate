import './BudgetSummary.css';

/**
 * BudgetSummary — displays a budget overview card with a progress bar.
 *
 * Props:
 *   budget        — traveller's stated budget in LKR
 *   estimatedCost — total estimated trip cost from the itinerary data
 *
 * All financial values come from props; no calculations are hard-coded here.
 */
function BudgetSummary({ budget, estimatedCost }) {
  const remaining = budget - estimatedCost;
  const isOver = remaining < 0;

  // What fraction of the budget is used (capped at 100% for the bar)
  const usedPercent = Math.min((estimatedCost / budget) * 100, 100);

  return (
    <div className="budget-summary" role="region" aria-label="Budget summary">
      {/* Three figures */}
      <div className="budget-summary__figures">
        <BudgetFigure
          label="Estimated Trip Cost"
          amount={estimatedCost}
          highlight
        />
        <BudgetFigure label="Traveller Budget" amount={budget} />
        <BudgetFigure
          label="Remaining Budget"
          amount={Math.abs(remaining)}
          prefix={isOver ? '-' : ''}
          isOver={isOver}
        />
      </div>

      {/* Progress bar */}
      <div className="budget-summary__progress" aria-label="Budget usage">
        <div
          className={`budget-summary__bar ${isOver ? 'budget-summary__bar--over' : ''}`}
          style={{ width: `${usedPercent}%` }}
          role="progressbar"
          aria-valuenow={usedPercent}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      <p className="budget-summary__label">
        {isOver
          ? `LKR ${Math.abs(remaining).toLocaleString()} over budget`
          : `LKR ${remaining.toLocaleString()} remaining from your budget`}
      </p>
    </div>
  );
}

/** Single budget figure display — label + amount. */
function BudgetFigure({ label, amount, prefix = '', highlight = false, isOver = false }) {
  return (
    <div className="budget-figure">
      <span className="budget-figure__label">{label}</span>
      <span
        className={[
          'budget-figure__amount',
          highlight ? 'budget-figure__amount--highlight' : '',
          isOver ? 'budget-figure__amount--over' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {prefix}LKR {amount.toLocaleString()}
      </span>
    </div>
  );
}

export default BudgetSummary;
