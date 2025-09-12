const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    age: { type: Number, required: true, min: 0 },
    dob: { type: Date },
    profilePic: { type: String, default: "" },
    street: { type: String, required: true, trim: true },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
    bio: { type: String },
    courses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course", trim: true },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
