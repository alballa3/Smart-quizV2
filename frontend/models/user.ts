import { compare } from "bcrypt";
import mongoose, { Schema } from "mongoose";


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
  },
  { timestamps: true }
);

userSchama.methods.comparePassword = function (candidatePassword: string) {
  return compare(candidatePassword, this.password);
};

const userModel = mongoose.models.User || mongoose.model("User", userSchama);
export default userModel;
