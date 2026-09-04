function calculateDestinationScore(destination, userInterests) {
  let score = 0;

  for (const interest of userInterests) {
    if (destination.interests.includes(interest)) {
      score += 20;
    }
  }

  return score;
}

module.exports = {
  calculateDestinationScore
};

function rankDestinations(destinations, userInterests) {
  const rankedDestinations = destinations.map((destination) => {
    const score = calculateDestinationScore(
      destination,
      userInterests
    );

    return {
      ...destination,
      score: score
    };
  });

  rankedDestinations.sort((a, b) => b.score - a.score);

  return rankedDestinations;
}

module.exports = {
  calculateDestinationScore,
  rankDestinations
};