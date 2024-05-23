const { Schema, model } = require("mongoose");

const boardSchema = new Schema(
  {
    boardContent: {},
    userId: {
      type: "ObjectId",
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Board", boardSchema);
