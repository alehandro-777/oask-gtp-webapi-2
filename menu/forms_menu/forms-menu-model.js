const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
  _id : Number,            // unique id
  name: { type: String, default: "for Label"},
  full_name: { type: String, default: "for search ../../"},
  payload: {},
  children: [{ type: Schema.Types.ObjectId, ref: 'menu_nodes' }],
  security: { type: Number, default: 100},
  enabled: { type: Boolean, default: true},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('menu_nodes', model); 

