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


userSchama.methods.comparePassword = function (
  candidatePassword: string
): Boolean {
  return Bun.password.verifySync(candidatePassword, this.password);
};

const userModel = mongoose.model("User", userSchama);
export default userModel;
