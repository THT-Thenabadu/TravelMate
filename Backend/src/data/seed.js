require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('../models/Destination');

const destinations = [
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
    description: "Tea country views, cool air, and some of Sri Lanka's best short hikes.",
    activity: "Little Adam's Peak and Nine Arches Bridge",
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

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    await Destination.deleteMany({});
    await Destination.insertMany(destinations);
    console.log(`Seeded ${destinations.length} destinations.`);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();