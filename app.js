require("dotenv").config();
require("./db");
const cors = require("cors");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
app.use(cors());

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/users", userRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const boardsRoutes = require("./routes/boards.routes");
app.use("/boards", boardsRoutes);

const assetsRoutes = require("./routes/assets.routes");
app.use("/assets", assetsRoutes);

require("./error-handling")(app);

module.exports = app;
