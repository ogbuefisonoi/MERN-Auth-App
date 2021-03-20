const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  userName: {
    type: String,
  }
//   isDeleted: {
//     type: Boolean,
//     default: false
//   },
//   signUpDate: {
//     type: Date,
//     default: Date.now()
//   }
});
// UserSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };
// UserSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };
module.exports = User = mongoose.model('user', UserSchema);