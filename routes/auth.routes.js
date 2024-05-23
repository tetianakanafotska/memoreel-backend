const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const authRouter = require("express").Router();

authRouter.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name || email === '' || password === '' || name === '') {
    res.status(400).json({ message: "Please provide your email, password, and name" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Please provide a valid email address" });
    return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      console.log('!!')
      res.status(400).json({ message: "This user already exists" });
    }
    return;
  });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  return User.create({ email, password: hashedPassword, name })
    .then((createdUser) => {
      const { email, name, _id } = createdUser;
      res.status(201).json({ email, name, _id });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      console.log(foundUser);

			if (!foundUser) {
				// If the user is not found, send an error response
				res.status(401).json({ message: 'User not found.' })
				return
			}

      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        const { _id, email, name } = foundUser;
        const payload = { _id, email, name };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Can't authenticate user" });
    });
});

authRouter.get("/verify", isAuthenticated, (req, res) => {
  console.log("req.payload", req.payload);
  res.status(200).json(req.payload);
});

module.exports = authRouter;
