const mongoose = require('mongoose');

const safetyTipSchema = new mongoose.Schema(
  {
    tipId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Emergency & Helplines',
        'Solo Female Safety',
        'Transport & Scams',
        'Health & Food',
        'Culture & Laws',
      ],
    },
    riskLevel: {
      type: String,
      required: true,
      enum: ['Critical', 'Important', 'General'],
      default: 'General',
    },
    summary: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    icon: {
      type: String,
      default: 'default',
    },
  },
  { timestamps: true }
);

// Text index to support fast keyword search across title/summary/details/tags
safetyTipSchema.index({
  title: 'text',
  summary: 'text',
  details: 'text',
  tags: 'text',
});

module.exports = mongoose.model('SafetyTip', safetyTipSchema);
