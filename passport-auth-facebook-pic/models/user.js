const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  githubId: {
    type: String
  },
  facebookId: String,
  displayName: String,
  profilePic: Array
});

const User = mongoose.model("User", userSchema);

module.exports = User;
