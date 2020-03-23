const mongoose = require('mongoose');

const ProfileDetailsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  suburb: {
    type: String
  },
  background: {
    type: String
  },
  Description: {
    type: Object
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ProfileDetails = mongoose.model('profile_details', ProfileDetailsSchema);
