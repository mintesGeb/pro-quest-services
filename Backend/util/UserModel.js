const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: "**********" },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  provided: { type: Array, default: [] },
  requestd: { type: Array, default: [] },
  accepted: { type: Array, default: [] },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now(),
  },
  ppUrl: { type: String, default: "./assets/images/blank-profile-picture.png" },
});

module.exports = mongoose.model("myUsers", UserSchema);
