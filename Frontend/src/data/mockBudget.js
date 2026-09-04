/**
 * mockBudget.js
 *
 * Temporary mock data for the Budget Planner feature.
 *
 * INTEGRATION NOTE:
 *   When real data is available, replace this file's exports with:
 *     budget       ← from the Preference Form (user's stated budget)
 *     budgetDetails ← from the Itinerary Planner (itineraryResult.budgetDetails)
 *
 *   BudgetSummary.jsx does NOT import this file directly.
 *   Mock data is only wired in App.jsx, so the swap is a one-line change there.
 *
 * All prices are sample/estimated values for prototype purposes only.
 * Do NOT treat these as live or guaranteed prices.
 */

/** Traveller's stated budget (comes from Preference Form in the real app). */
export const mockBudget = 50000

/**
 * Detailed cost breakdown produced by the Itinerary Planner.
 * Shape matches itineraryResult.budgetDetails so BudgetSummary works
 * with real data without any component changes.
 */
export const mockBudgetDetails = {
  accommodation: [
    {
      name: 'Kandy Budget Stay',
      location: 'Kandy City',
      roomType: 'Non-AC',
      nights: 1,
      pricePerNight: 4500,
      total: 4500,
    },
    {
      name: 'Ella Budget Guesthouse',
      location: 'Ella Town',
      roomType: 'Non-AC',
      nights: 1,
      pricePerNight: 5000,
      total: 5000,
    },
    {
      name: 'Mirissa Beach Hostel',
      location: 'Mirissa',
      roomType: 'Non-AC',
      nights: 1,
      pricePerNight: 4000,
      total: 4000,
    },
  ],

  transport: [
    {
      from: 'Colombo',
      to: 'Kandy',
      type: 'Train',
      category: 'Public Transport',
      cost: 1500,
    },
    {
      from: 'Kandy',
      to: 'Ella',
      type: 'Train',
      category: 'Public Transport',
      cost: 2000,
    },
    {
      from: 'Ella',
      to: 'Mirissa',
      type: 'Bus',
      category: 'Public Transport',
      cost: 800,
    },
  ],

  food: [
    {
      destination: 'Kandy',
      place: 'Kandy Local Food Centre',
      type: 'Local Restaurant',
      mealInfo: 'Estimated daily food',
      estimatedCost: 2500,
    },
    {
      destination: 'Ella',
      place: 'Ella Local Kitchen',
      type: 'Local Restaurant',
      mealInfo: 'Estimated daily food',
      estimatedCost: 2700,
    },
    {
      destination: 'Mirissa',
      place: 'Mirissa Seafood Corner',
      type: 'Local Restaurant',
      mealInfo: 'Estimated daily food',
      estimatedCost: 3000,
    },
  ],

  activities: [
    {
      destination: 'Kandy',
      name: 'Temple of the Tooth',
      estimatedCost: 2000,
    },
    {
      destination: 'Kandy',
      name: 'Kandy Lake Walk',
      estimatedCost: 0,
    },
    {
      destination: 'Ella',
      name: 'Nine Arches Bridge',
      estimatedCost: 0,
    },
    {
      destination: 'Ella',
      name: "Little Adam's Peak Hike",
      estimatedCost: 500,
    },
    {
      destination: 'Mirissa',
      name: 'Coconut Tree Hill',
      estimatedCost: 0,
    },
  ],
}
