var mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment');

module.exports = function() {
  var schema = mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 6
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    roleId: {
      type: Number,
      default: 1
    },
    lastLoginDate: {
      type: Date,
      default: Date.now
    },
    creationDate: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  });
  schema.plugin(autoIncrement.plugin, {
    model: 'User',
    startAt: 1
  });
  return mongoose.model('User', schema);
};
