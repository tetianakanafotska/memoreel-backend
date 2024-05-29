const { Schema, model } = require("mongoose");

const assetSchema = new Schema({
  type: {
    type: String,
    enum: ["text", "youtubeURL", "image", "camImage", "audio"],
  },
  content: String,
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("Asset", assetSchema);
