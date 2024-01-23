const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupRouter = require("express").Router();
const User = require("../models/user");

signupRouter.post("/", async (request, response) => {
  try {
    const { username, password } = request.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({ error: "Username is already taken" });
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      username,
      passwordHash,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a token for the new user
    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    response.status(201).json({
      token,
      username: savedUser.username,
      name: savedUser.name, // Update with your user model fields
    });
  } catch (error) {
    console.error("Signup failed:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = signupRouter;
