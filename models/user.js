const mongoose = require('mongoose');

//application schema
const applicationSchema = new mongoose.Schema({

  company:{
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  postingLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ["interested", "applied", "interviewing", "rejected", "accepted"],
  },
});


// user Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  applications: [applicationSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
