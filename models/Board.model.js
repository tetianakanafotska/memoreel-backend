const { Schema, model } = require("mongoose");

const boardSchema = new Schema({
  boardContent: {},
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Board", boardSchema);
