const { Schema, model } = require('mongoose');

const boardSchema = new Schema({
  "boardContent": {}
}, { timestamps: true });

module.exports = model('Board', boardSchema);