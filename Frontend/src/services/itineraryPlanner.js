const DESTINATIONS = [
  {
    name: 'Kandy',
    region: 'Central hills',
    tags: ['Culture', 'Nature'],
    styles: ['Backpacker', 'Mid-range', 'Luxury'],
    cost: 42,
    nights: 1,
    description: 'Temple visits, lake walks, and a gentle introduction to the hill country.',
    activity: 'Temple of the Tooth and Kandy Lake walk',
  },
  {
    name: 'Ella',
    region: 'Uva highlands',
    tags: ['Nature', 'Adventure'],
    styles: ['Backpacker', 'Mid-range', 'Luxury'],
    cost: 38,
    nights: 2,
    description: 'Tea country views, cool air, and some of Sri Lanka\'s best short hikes.',
    activity: 'Little Adam\'s Peak and Nine Arches Bridge',
  },
  {
    name: 'Sigiriya',
    region: 'Cultural triangle',
    tags: ['Culture', 'Adventure', 'Nature'],
    styles: ['Backpacker', 'Mid-range', 'Luxury'],
    cost: 55,
    nights: 1,
    description: 'An iconic rock fortress framed by forest, lakes, and ancient history.',
    activity: 'Sunrise climb of Sigiriya Rock Fortress',
  },
  {
    name: 'Mirissa',
    region: 'South coast',
    tags: ['Nature', 'Food', 'Nightlife'],
    styles: ['Backpacker', 'Mid-range', 'Luxury'],
    cost: 48,
    nights: 2,
    description: 'A relaxed beach base for swimming, seafood, and sunset evenings.',
    activity: 'Beach morning and fresh seafood dinner',
  },
  {
    name: 'Galle',
    region: 'South coast',
    tags: ['Culture', 'Food', 'Nightlife'],
    styles: ['Mid-range', 'Luxury'],
    cost: 62,
    nights: 1,
    description: 'Colonial lanes, independent cafes, and a walkable fort by the sea.',
    activity: 'Galle Fort ramparts and old town food trail',
  },
  {
    name: 'Arugam Bay',
    region: 'East coast',
    tags: ['Adventure', 'Food', 'Nightlife'],
    styles: ['Backpacker', 'Mid-range'],
    cost: 44,
    nights: 2,
    description: 'A laid-back surf town with a strong cafe scene and easygoing nights.',
    activity: 'Surf lesson or lagoon safari',
  },
  {
    name: 'Yala',
    region: 'Southern wilderness',
    tags: ['Nature', 'Adventure'],
    styles: ['Mid-range', 'Luxury'],
    cost: 76,
    nights: 1,
    description: 'A wildlife-focused stop for safari drives through dry-zone landscapes.',
    activity: 'Early morning Yala National Park safari',
  },
];

const STARTING_POINTS = ['colombo', 'negombo', 'galle', 'kandy', 'ella', 'sigiriya', 'mirissa'];

function scoreDestination(destination, preferences) {
  const matchingInterests = destination.tags.filter((tag) =>
    preferences.interests.includes(tag)
  ).length;
  const styleMatch = destination.styles.includes(preferences.travelStyle) ? 2 : 0;
  const budgetFit = destination.cost <= preferences.budget / Math.max(Number(preferences.days), 1) ? 1 : 0;

  return matchingInterests * 4 + styleMatch + budgetFit;
}

export function generateItinerary(preferences) {
  const days = Number(preferences.days);
  const budget = Number(preferences.budget);
  const ranked = [...DESTINATIONS].sort(
    (first, second) => scoreDestination(second, preferences) - scoreDestination(first, preferences)
  );
  const destinationCount = Math.min(ranked.length, Math.max(1, Math.ceil(days / 2)));
  const selected = ranked.slice(0, destinationCount);
  const start = preferences.startingLocation.trim();
  const startIndex = STARTING_POINTS.findIndex((place) => start.toLowerCase().includes(place));

  if (startIndex > 0) {
    selected.sort((first, second) => {
      const firstIndex = STARTING_POINTS.indexOf(first.name.toLowerCase());
      const secondIndex = STARTING_POINTS.indexOf(second.name.toLowerCase());
      return Math.abs(firstIndex - startIndex) - Math.abs(secondIndex - startIndex);
    });
  }

  const dailyBaseCost = Math.round(budget / days);
  const totalEstimatedCost = selected.reduce((total, destination) => total + destination.cost, 0) + days * 18;
  const itineraryDays = Array.from({ length: days }, (_, index) => {
    const destination = selected[Math.min(Math.floor(index / Math.max(1, Math.ceil(days / selected.length))), selected.length - 1)];
    const isFirstDay = index === 0;
    const previous = index > 0 ? selected[Math.min(Math.floor((index - 1) / Math.max(1, Math.ceil(days / selected.length))), selected.length - 1)] : null;

    return {
      day: index + 1,
      destination,
      transport: isFirstDay
        ? `From ${start} to ${destination.name}`
        : previous?.name === destination.name
          ? 'Local tuk-tuk and walking'
          : `Scenic bus from ${previous?.name} to ${destination.name}`,
      cost: Math.min(dailyBaseCost, Math.max(destination.cost, 20)),
      focus: index % 2 === 0 ? destination.activity : `Slow afternoon in ${destination.name}`,
    };
  });

  return {
    preferences,
    selected,
    days: itineraryDays,
    totalEstimatedCost,
    withinBudget: totalEstimatedCost <= budget,
    budget,
  };
}