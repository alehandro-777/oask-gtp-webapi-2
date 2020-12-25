const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
  _id : Number,
  title : String,            // friendly  name
  point_controls : [],       //db_points id
  enabled: { type: Boolean, default: true},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('forms', model);  