const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tier: { type: String, required: true, enum: ["Platinum", "Gold", "Silver"] }, // New field
});

module.exports = mongoose.model("User", UserSchema);
