const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  price: {
    type: Number
  },
  location: {
    type: String
  },
  description: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
