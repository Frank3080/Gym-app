const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const loginRouter = require("./controllers/login");
const { tokenExtractor } = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const signupRouter = require("./controllers/signup");
const calendarRouter = require("./controllers/calendar");
const todosRouter = require("./controllers/todo");

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info("connected to mongodb");
  })
  .catch((err) => {
    logger.error("error connecting to mongodb: ", err.message);
  });

app.use(cors());
app.use(express.json());
//middleware
app.use(tokenExtractor);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/todos", todosRouter);

module.exports = app;
