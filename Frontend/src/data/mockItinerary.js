/**
 * Mock itinerary data for UI development.
 *
 * This file is a temporary stand-in for the real itinerary output that will
 * be produced by the itinerary-planner feature. Replace this data (or swap
 * the import in Results.jsx) when the real planner is integrated.
 *
 * Shape must match what the Results page and its child components expect via props.
 */

const mockItinerary = {
  tripSummary: {
    startLocation: "Colombo",
    days: 3,
    budget: 30000,
    interests: ["Nature", "Culture", "Adventure"],
  },

  itinerary: [
    {
      day: 1,
      destination: "Kandy",
      description: "Explore the cultural heart of Sri Lanka.",
      activities: ["Temple of the Tooth", "Kandy Lake"],
      transport: "Train",
      estimatedCost: 5000,
    },
    {
      day: 2,
      destination: "Ella",
      description: "Experience Sri Lanka's hill country and natural scenery.",
      activities: ["Nine Arches Bridge", "Little Adam's Peak"],
      transport: "Train",
      estimatedCost: 6500,
    },
    {
      day: 3,
      destination: "Mirissa",
      description: "Relax on Sri Lanka's southern coast.",
      activities: ["Mirissa Beach", "Coconut Tree Hill"],
      transport: "Bus",
      estimatedCost: 7000,
    },
  ],

  totalEstimatedCost: 18500,
};

export default mockItinerary;
