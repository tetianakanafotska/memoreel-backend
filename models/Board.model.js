const { Schema, model } = require("mongoose");

const boardSchema = new Schema({
  timestamps: true,
});

const Board = model(Board, boardSchema);
