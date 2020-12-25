const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
    _id : Number,            // unique id
    id: { type: String, default: "for Label"},
    name: { type: String, default: "control_name"},
    label: { type: String, default: "label_text"},
    value: { type: String, default: "000.0"},
    type: { type: String, default: "text"},
    regex: { type: String, default: "regex_for_validation"},
    options: [{ key: String,  value: String }],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('form_controls', model); 

