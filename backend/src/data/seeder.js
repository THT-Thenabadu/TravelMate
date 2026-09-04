// Run with: npm run seed          (imports data)
//           npm run seed:destroy  (wipes the three collections)
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const SafetyTip = require('../models/SafetyTip');
const EmergencyNumber = require('../models/EmergencyNumber');
const EmergencyPhrase = require('../models/EmergencyPhrase');

const { emergencyNumbers, safetyTips, emergencyPhrases } = require('./seedData');

const run = async () => {
  await connectDB();

  try {
    if (process.argv.includes('--delete')) {
      await Promise.all([
        SafetyTip.deleteMany(),
        EmergencyNumber.deleteMany(),
        EmergencyPhrase.deleteMany(),
      ]);
      console.log('Data destroyed.');
    } else {
      await Promise.all([
        SafetyTip.deleteMany(),
        EmergencyNumber.deleteMany(),
        EmergencyPhrase.deleteMany(),
      ]);
      await Promise.all([
        SafetyTip.insertMany(safetyTips),
        EmergencyNumber.insertMany(emergencyNumbers),
        EmergencyPhrase.insertMany(emergencyPhrases),
      ]);
      console.log('Data imported successfully.');
    }
    process.exit(0);
  } catch (error) {
    console.error(`Seeder error: ${error.message}`);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

run();
