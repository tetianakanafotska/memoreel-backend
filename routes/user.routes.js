const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User.model");
const Board = require("../models/Board.model");

router.post("/", (req, res) => {
  User.create(req.body)
    .then((createdUser) => {
      res.status(200).json(createdUser);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.put("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        if (req.body.name != null) {
          user.name = req.body.name;
        }
        if (req.body.email != null) {
          user.email = req.body.email;
        }
        if (req.body.password != null) {
          user.password = req.body.password;
        }

        user
          .save()
          .then((updatedUser) => {
            res.json(updatedUser);
          })
          .catch((error) => {
            res.status(400).json({ message: error.message });
          });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.delete("/:userId", (req, res) => {
  User.findByIdAndDelete(req.params.userId)
    .then(() => {
      res.json({ message: "User deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:userId/boards", (req, res) => {
  const { start, end } = req.query;
  const startDate = new Date(`${start}T00:00:00.000Z`);
  const endDate = end
    ? new Date(`${end}T23:59:59.999Z`)
    : new Date(`${start}T23:59:59.999Z`);

  let filter = { userId: req.params.userId };

  if (start) {
    filter.createdAt = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  Board.find(filter)
    .populate("assets")
    .then((allBoards) => {
      res.status(200).json(allBoards);
    })
    .catch((error) => {
      console.error("Error fetching boards:", error);
      res.status(500).json({ error: "Failed to fetch all the boards" });
    });
});

module.exports = router;
