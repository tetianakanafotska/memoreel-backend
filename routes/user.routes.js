const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User.model");

router.post("/", (req, res) => {
  User.create(req.body)
    .then((createdUser) => {
        res.status(200).json(createdUser);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
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

router.put("/:id", (req, res) => {
  User.findById(req.params.id)
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

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ message: "User deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
