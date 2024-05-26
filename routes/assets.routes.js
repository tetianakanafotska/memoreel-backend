const router = require("express").Router();
const Asset = require("../models/Asset.model.js");
const Board = require("../models/Board.model.js");

// post a new asset
router.post("/", async (req, res) => {
  const { userId, boardId } = req.body;

  try {
    const createdAsset = await Asset.create(req.body);
    await Board.findByIdAndUpdate(boardId, {
      $push: { assets: createdAsset._id },
    });
    res.status(201).json(createdAsset);
  } catch (error) {
    console.error("Error creating asset:", error);
    res.status(500).json({ error: "Failed to create a new asset" });
  }
});

// get a single asset
router.get("/:assetId", (req, res) => {
  const { assetId } = req.params;

  Board.findById(assetId)
    .then((asset) => {
      res.status(200).json(asset);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch this asset" });
    });
});

// redo a single asset
router.put("/:assetId", (req, res) => {
  const { assetId } = req.params;

  Asset.findByIdAndUpdate(assetId, req.body)
    .then((updatedAsset) => {
      res.status(200).json(updatedAsset);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update this asset" });
    });
});

// delete a single asset

router.delete("/:assetId", async (req, res) => {
  const { assetId } = req.params;
  try {
    const deletedAsset = await Asset.findByIdAndDelete(assetId);
    if (!deletedAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    const updatedBoard = await Board.findByIdAndUpdate(
      deletedAsset.boardId,
      { $pull: { assets: assetId } }
      //{ new: true }
    );

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting asset:", error);
    res.status(500).json({ error: "Failed to delete this asset" });
  }
});
module.exports = router;
