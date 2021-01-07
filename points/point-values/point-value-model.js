const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
  num_value: { type: Number, default: 0},
  str_value: { type: String, default: "0"},
  current_time: { type: Date, default: Date.now },   
  str_current_time: { type: String, default: "2020-12-01" },   
  point_id: { type: Number, ref: 'db_points' },
  transaction_id: { type: Schema.Types.ObjectId, ref: 'point_transactions' },
  valid: { type: Boolean, default: true},
  created_at: { type: Date, default: Date.now }
});

model.index({ "point_id": 1, "current_time": 1}, { unique: true });    

module.exports = mongoose.model('db_point_values', model); 
