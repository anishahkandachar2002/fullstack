const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  srn: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Avoid overwriting the model
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
