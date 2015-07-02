var mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment');

module.exports = function() {
  var schema = mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
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
  schema.plugin(autoIncrement.plugin, 'User');
  return mongoose.model('User', schema);
};
