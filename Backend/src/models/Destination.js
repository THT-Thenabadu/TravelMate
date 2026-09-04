const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String },
  tags: [{ type: String }],
  styles: [{ type: String }],
  cost: { type: Number },
  nights: { type: Number },
  description: { type: String },
  activity: { type: String }
});

module.exports = mongoose.model('Destination', DestinationSchema);