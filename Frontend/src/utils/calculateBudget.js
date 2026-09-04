/**
 * calculateBudget.js
 *
 * Pure utility functions — no React, no UI concerns.
 *
 * Integration note:
 *   When the Preference Form and Itinerary Planner are connected, pass
 *   their values here instead of mock data. These functions require no changes.
 */

/**
 * sumDetails — derives category totals from budgetDetails arrays.
 *
 * This is the primary calculation path when detailed data is available.
 * It reads the appropriate cost field from each array item.
 *
 * @param {object} budgetDetails — { accommodation[], transport[], food[], activities[] }
 * @returns {{ accommodation, transport, food, activities }} — numeric totals per category
 */
export function sumDetails(budgetDetails = {}) {
  // Helper: safely sum a numeric field from an array, defaulting missing values to 0
  function safeSum(arr, field) {
    if (!Array.isArray(arr)) return 0
    return arr.reduce((sum, item) => {
      const val = Number(item?.[field])
      return sum + (isNaN(val) || val < 0 ? 0 : val)
    }, 0)
  }

  return {
    accommodation: safeSum(budgetDetails.accommodation, 'total'),
    transport:     safeSum(budgetDetails.transport,     'cost'),
    food:          safeSum(budgetDetails.food,          'estimatedCost'),
    activities:    safeSum(budgetDetails.activities,    'estimatedCost'),
  }
}

/**
 * calculateBudget — compares a budget against category cost totals.
 *
 * @param {number} budget  - Traveller's total budget in LKR.
 * @param {object} costs   - { accommodation, transport, food, activities } — numeric totals.
 *                           Any missing key defaults to 0 so the function never crashes.
 * @returns {{
 *   totalEstimated: number,
 *   remaining: number,
 *   isWithinBudget: boolean,
 *   overBudgetAmount: number
 * }}
 */
function calculateBudget(budget, costs = {}) {
  // Guard against bad inputs — treat undefined / negative budget as 0
  const safeBudget = (typeof budget === 'number' && budget >= 0) ? budget : 0

  // Default each category to 0 if it is missing or negative
  const accommodation = Math.max(Number(costs.accommodation) || 0, 0)
  const transport     = Math.max(Number(costs.transport)     || 0, 0)
  const food          = Math.max(Number(costs.food)          || 0, 0)
  const activities    = Math.max(Number(costs.activities)    || 0, 0)

  const totalEstimated   = accommodation + transport + food + activities
  const remaining        = safeBudget - totalEstimated
  const isWithinBudget   = totalEstimated <= safeBudget
  const overBudgetAmount = isWithinBudget ? 0 : totalEstimated - safeBudget

  return {
    totalEstimated,
    remaining,
    isWithinBudget,
    overBudgetAmount,
  }
}

export default calculateBudget
