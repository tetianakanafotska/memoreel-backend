const router = require("express").Router();
const Board = require("../models/Board.model.js");
const fileUploader = require("../config/cloudinary.config");

// post a new board
router.post("/", (req, res, next) => {
  Board.create(req.body)
    .then((createdBoard) => {
      res.status(201).json(createdBoard);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create a new board" });
    });
});

// get a single board
router.get("/:boardId", (req, res, next) => {
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
router.put("/:boardId", (req, res, next) => {
  const { boardId } = req.params;

  Board.findByIdAndUpdate(boardId, req.body, updatedBoard)
    .then((updatedBoard) => {
      res.status(204).json(updatedBoard);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update this board" });
    });
});

// patch a single board
router.patch("/:boardId", (req, res, next) => {
  const { boardId } = req.params;

  Board.findByIdAndUpdate(
    boardId,
    { $set: { boardContent: req.body } },
    { new: true, useFindAndModify: false }
  )
    .then((updatedBoard) => {
      res.status(204).json(updatedBoard);
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

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});
module.exports = router;
