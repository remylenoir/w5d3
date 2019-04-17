const mongoose = require('mongoose');
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
  facebookId: {
    type: String
  },
  displayName: {
    type: String
  },
  role: {
    type: String,
    enum: ['guest', 'admin'],
    default: 'guest'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
