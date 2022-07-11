import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { User } from "../userModel.js";
import jsonwebtoken from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not a valid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  sites: {
    type: Array,
    default: [],
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("unable to login");
  }
  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const token = jsonwebtoken.sign({ _id: this._id.toString() }, "idrk");
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

export { userSchema };
