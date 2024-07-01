require("dotenv").config();
require("./db");
const express = require("express");
const cors = require("cors");

const { isAuthenticated } = require("./middleware/jwt.middleware");
const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";
const app = express();

require("./config")(app);
app.use(
  cors({
    origin: [FRONTEND_URL],
  })
);
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/users", isAuthenticated, userRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const boardsRoutes = require("./routes/boards.routes");
app.use("/boards", isAuthenticated, boardsRoutes);

const assetsRoutes = require("./routes/assets.routes");
app.use("/assets", assetsRoutes);

require("./error-handling")(app);

module.exports = app;
