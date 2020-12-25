const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  data: {},             //posted data
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('point_transactions', model);
































