const router = require("express").Router();
const Board = require("../models/Board.model.js");
const User = require("../models/User.model.js");

// post a new board
router.post("/", async (req, res) => {
  const { userId } = req.body;

  try {
    const createdBoard = await Board.create(req.body);
    await User.findByIdAndUpdate(userId, {
      $push: { boards: createdBoard._id },
    });
    res.status(201).json(createdBoard);
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ error: "Failed to create a new board" });
  }
});

// get a single board
router.get("/:boardId", (req, res) => {
  const { boardId } = req.params;

  Board.findById(boardId)
    .then((board) => {
      res.status(200).json(board);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch this board" });
    });
});

// redo a single board
router.put("/:boardId", (req, res) => {
  const { boardId } = req.params;

  Board.findByIdAndUpdate(boardId, req.body, updatedBoard)
    .then((updatedBoard) => {
      res.status(200).json(updatedBoard);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update this board" });
    });
});

// patch a single board
router.patch("/:boardId", (req, res) => {
  const { boardId } = req.params;

  Board.findByIdAndUpdate(
    boardId,
    { $set: { boardContent: req.body } },
    { new: true, useFindAndModify: false }
  )
    .then((updatedBoard) => {
      res.status(200).json(updatedBoard);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update this board" });
    });
});

// delete a single board
router.delete("/:boardId", (req, res, next) => {
  const { boardId } = req.params;

  Board.findByIdAndDelete(boardId)
    .then((result) => {
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete this board" });
    });
});

module.exports = router;
