const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
  _id : Number,            // unique id
  name: { type: String, default: "for Label"},
  short_name: { type: String, default: "for table"},
  full_name: { type: String, default: "for search"},
  min: { type: Number, default: 0},
  max: { type: Number, default: 100},
  control_id: { type: Number, ref: 'form_controls' },   
  security: { type: Number, default: 100},
  enabled: { type: Boolean, default: true},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('db_points', model); 





