const router = require("express").Router();
const User = require("../models/User.model.js");

router.post("/signup", (req, res, next) => {
  User.create(req.body).then((createdUser) => {
    res.status(201).json(createdUser);
  });
});

module.exports = router;
