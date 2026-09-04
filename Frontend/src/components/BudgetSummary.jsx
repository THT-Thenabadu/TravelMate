import { useState } from 'react'
import calculateBudget, { sumDetails } from '../utils/calculateBudget'
import './BudgetSummary.css'

/**
 * BudgetSummary
 *
 * Displays the full Budget Breakdown for a TravelMate Sri Lanka trip,
 * including expandable per-category detail panels.
 *
 * Props:
 *   budget        {number} — traveller's total budget in LKR
 *   budgetDetails {object} — {
 *                              accommodation[], transport[],
 *                              food[], activities[]
 *                            }
 *                            Matches itineraryResult.budgetDetails so swapping
 *                            mock data for real data requires no component changes.
 *
 * The component never imports mock data directly.
 */
function BudgetSummary({ budget, budgetDetails = {} }) {
  // ── Derive category totals from the detail arrays ──────────────────
  const costs = sumDetails(budgetDetails)

  // ── Overall budget comparison ───────────────────────────────────────
  const { totalEstimated, remaining, isWithinBudget, overBudgetAmount } =
    calculateBudget(budget, costs)

  // ── Progress bar ────────────────────────────────────────────────────
  const usedPercent = budget > 0 ? (totalEstimated / budget) * 100 : 0
  const barPercent  = Math.min(usedPercent, 100)

  // ── Largest expense insight ─────────────────────────────────────────
  const categoryLabels = {
    accommodation: 'Accommodation',
    transport:     'Transport',
    food:          'Food',
    activities:    'Activities',
  }
  const largestKey = Object.keys(costs).reduce((a, b) => costs[a] >= costs[b] ? a : b)
  const largestLabel  = categoryLabels[largestKey]
  const largestAmount = costs[largestKey]

  // ── Expand/collapse state — each category can be open independently ─
  const [open, setOpen] = useState({
    accommodation: false,
    transport:     false,
    food:          false,
    activities:    false,
  })

  function toggle(category) {
    setOpen(prev => ({ ...prev, [category]: !prev[category] }))
  }

  return (
    <section className="budget-summary" aria-labelledby="budget-heading">

      {/* ── Header ── */}
      <div className="budget-summary__header">
        <h2 id="budget-heading" className="budget-summary__title">
          Budget Breakdown
        </h2>
        <span
          className={`budget-badge ${isWithinBudget ? 'budget-badge--ok' : 'budget-badge--over'}`}
          aria-label={isWithinBudget ? 'Within budget' : 'Over budget'}
        >
          {isWithinBudget ? '✓ Within Budget' : '✗ Over Budget'}
        </span>
      </div>

      {/* ── Category rows with expandable details ── */}
      <div className="budget-breakdown">

        <CategoryRow
          label="Accommodation"
          amount={costs.accommodation}
          isOpen={open.accommodation}
          onToggle={() => toggle('accommodation')}
        >
          <AccommodationDetails items={budgetDetails.accommodation} />
        </CategoryRow>

        <CategoryRow
          label="Transport"
          amount={costs.transport}
          isOpen={open.transport}
          onToggle={() => toggle('transport')}
        >
          <TransportDetails items={budgetDetails.transport} />
        </CategoryRow>

        <CategoryRow
          label="Food"
          amount={costs.food}
          isOpen={open.food}
          onToggle={() => toggle('food')}
        >
          <FoodDetails items={budgetDetails.food} />
        </CategoryRow>

        <CategoryRow
          label="Activities"
          amount={costs.activities}
          isOpen={open.activities}
          onToggle={() => toggle('activities')}
        >
          <ActivitiesDetails items={budgetDetails.activities} />
        </CategoryRow>

      </div>

      {/* ── Divider ── */}
      <hr className="budget-divider" />

      {/* ── Summary figures ── */}
      <div className="budget-figures">
        <BudgetFigure label="Estimated Total" amount={totalEstimated} emphasis />
        <BudgetFigure label="Traveller Budget" amount={budget} />
        {isWithinBudget ? (
          <BudgetFigure label="Remaining Budget" amount={remaining} positive />
        ) : (
          <BudgetFigure label="Over Budget By" amount={overBudgetAmount} negative />
        )}
      </div>

      {/* ── Progress bar ── */}
      <div className="budget-progress" aria-label={`Budget used: ${Math.round(usedPercent)}%`}>
        <div className="budget-progress__labels">
          <span>Budget used</span>
          <span>{Math.round(usedPercent)}%</span>
        </div>
        <div className="budget-progress__track">
          <div
            className={`budget-progress__bar ${!isWithinBudget ? 'budget-progress__bar--over' : ''}`}
            style={{ width: `${barPercent}%` }}
            role="progressbar"
            aria-valuenow={barPercent}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>

      {/* ── Largest expense insight ── */}
      {largestAmount > 0 && (
        <div className="budget-insight">
          <span className="budget-insight__label">Largest expense</span>
          <span className="budget-insight__value">
            {largestLabel} — LKR {largestAmount.toLocaleString()}
          </span>
        </div>
      )}

      {/* ── Status message + suggestions ── */}
      {isWithinBudget ? (
        <p className="budget-status budget-status--ok">
          Your trip is within budget. You have LKR {remaining.toLocaleString()} to spare.
        </p>
      ) : (
        <div className="budget-status budget-status--over">
          <p>
            Your trip is over budget by{' '}
            <strong>LKR {overBudgetAmount.toLocaleString()}</strong>.
          </p>
          <ul className="budget-suggestions">
            <li>Consider cheaper accommodation options</li>
            <li>Use public transport where possible</li>
            <li>Reduce paid activities</li>
          </ul>
        </div>
      )}

    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   CategoryRow — collapsible wrapper for each budget category
   ═══════════════════════════════════════════════════════════════════ */

function CategoryRow({ label, amount, isOpen, onToggle, children }) {
  return (
    <div className="category-row">
      {/* Always-visible header strip */}
      <div className="category-row__header">
        <span className="category-row__label">{label}</span>
        <div className="category-row__right">
          <span className="category-row__amount">LKR {amount.toLocaleString()}</span>
          <button
            type="button"
            className="category-row__toggle"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-label={`${isOpen ? 'Hide' : 'View'} ${label} details`}
          >
            {isOpen ? 'Hide Details ▲' : 'View Details ▼'}
          </button>
        </div>
      </div>

      {/* Expandable detail panel */}
      {isOpen && (
        <div className="category-row__details">
          {children}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Detail panel components — one per category
   ═══════════════════════════════════════════════════════════════════ */

/** Accommodation detail list */
function AccommodationDetails({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="detail-empty">No accommodation details available.</p>
  }
  return (
    <ul className="detail-list">
      {items.map((item, i) => (
        <li key={i} className="detail-card">
          <div className="detail-card__name">{item.name || 'Accommodation'}</div>
          <div className="detail-card__rows">
            {item.location  && <DetailRow label="Location"  value={item.location} />}
            {item.roomType  && <DetailRow label="Room Type" value={item.roomType} />}
            {item.nights > 0 && item.pricePerNight > 0 && (
              <DetailRow
                label="Rate"
                value={`${item.nights} night${item.nights > 1 ? 's' : ''} × LKR ${Number(item.pricePerNight).toLocaleString()}`}
              />
            )}
            <DetailRow
              label="Estimated Total"
              value={`LKR ${Number(item.total || 0).toLocaleString()}`}
              highlight
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Transport detail list */
function TransportDetails({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="detail-empty">No transport details available.</p>
  }
  return (
    <ul className="detail-list">
      {items.map((item, i) => (
        <li key={i} className="detail-card">
          <div className="detail-card__name">
            {item.from || '?'} → {item.to || '?'}
          </div>
          <div className="detail-card__rows">
            {item.type     && <DetailRow label="Type"     value={item.type} />}
            {item.category && <DetailRow label="Category" value={item.category} />}
            <DetailRow
              label="Estimated Cost"
              value={`LKR ${Number(item.cost || 0).toLocaleString()}`}
              highlight
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** Food detail list */
function FoodDetails({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="detail-empty">No food details available.</p>
  }
  return (
    <ul className="detail-list">
      {items.map((item, i) => (
        <li key={i} className="detail-card">
          <div className="detail-card__name">{item.destination || 'Destination'}</div>
          <div className="detail-card__rows">
            {item.place    && <DetailRow label="Suggested Place" value={item.place} />}
            {item.type     && <DetailRow label="Type"            value={item.type} />}
            {item.mealInfo && <DetailRow label="What's included" value={item.mealInfo} />}
            <DetailRow
              label="Estimated Meal Cost"
              value={`LKR ${Number(item.estimatedCost || 0).toLocaleString()}`}
              highlight
            />
          </div>
          <p className="detail-card__note">Sample estimated food cost</p>
        </li>
      ))}
    </ul>
  )
}

/** Activities detail list */
function ActivitiesDetails({ items }) {
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="detail-empty">No activity details available.</p>
  }
  return (
    <ul className="detail-list">
      {items.map((item, i) => {
        const cost = Number(item.estimatedCost)
        const isFree = !cost || cost <= 0
        return (
          <li key={i} className="detail-card">
            <div className="detail-card__name">{item.name || 'Activity'}</div>
            <div className="detail-card__rows">
              {item.destination && <DetailRow label="Destination" value={item.destination} />}
              <DetailRow
                label="Estimated Cost"
                value={isFree ? 'Free' : `LKR ${cost.toLocaleString()}`}
                highlight={!isFree}
                free={isFree}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   Shared small presentational helpers
   ═══════════════════════════════════════════════════════════════════ */

/** A single label / value row inside a detail card */
function DetailRow({ label, value, highlight = false, free = false }) {
  return (
    <div className="detail-row">
      <span className="detail-row__label">{label}</span>
      <span
        className={[
          'detail-row__value',
          highlight ? 'detail-row__value--highlight' : '',
          free      ? 'detail-row__value--free'      : '',
        ].filter(Boolean).join(' ')}
      >
        {value}
      </span>
    </div>
  )
}

/** One of the three summary figures (Estimated Total / Budget / Remaining) */
function BudgetFigure({ label, amount, emphasis = false, positive = false, negative = false }) {
  const cls = [
    'budget-figure',
    emphasis ? 'budget-figure--emphasis' : '',
    positive ? 'budget-figure--positive' : '',
    negative ? 'budget-figure--negative' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={cls}>
      <span className="budget-figure__label">{label}</span>
      <span className="budget-figure__amount">LKR {Math.abs(amount).toLocaleString()}</span>
    </div>
  )
}

export default BudgetSummary
