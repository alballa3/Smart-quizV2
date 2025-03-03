import { hash } from "bun";
import mongoose, { Schema } from "mongoose";
const session = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  exportAt: {
    type: Date,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
});

const userSchama = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },

    createdAt: {
      default: Date.now,
      type: Date,
    },
    sessions: [session],
  },
  { timestamps: true }
);

userSchama.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = hash(this.password).toString();
  next();
});

const userModel = mongoose.model("User", userSchama);

export default userModel;
