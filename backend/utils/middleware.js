const jwt = require("jsonwebtoken");
const User = require("../models/user");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
    next();
  } else {
    req.token = "";
    next();
  }
};

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: "auth token is missing" });
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "invalid auth token" });
  }

  const user = await User.findById(decodedToken.id);
  req.user = user;
  next();
};

module.exports = { tokenExtractor, userExtractor };
