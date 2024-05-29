const { Schema, model } = require("mongoose");

const boardSchema = new Schema({
  assets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Asset",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: false },
});

module.exports = model("Board", boardSchema);
