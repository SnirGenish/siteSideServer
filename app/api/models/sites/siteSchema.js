import mongoose from "mongoose";
import validator from "validator";
const siteSchema = new mongoose.Schema({
  owner: {
    id: {
      type: String,
      required: true,
    },
  },
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 15,
    unique: true,
    validate: {
      validator: validator.isAlphanumeric,
      message: "Title must be alphanumeric",
    },
  },
  logo: {
    isText: {
      type: Boolean,
    },
    text: {
      type: String,
    },
    url: {
      type: String,
      validate: {
        validator(value) {
          if (!validator.isURL) {
            throw new Error("not a valid URL");
          }
        },
      },
    },
  },
  homeContent: {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    buttonLabel: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
      validator(value) {
        if (!validator.isURL) {
          throw new Error("not a valid URL");
        }
      },
    },
  },
  aboutContent: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  Social: {
    links: [
      {
        type: String,
        required: true,
        validator(value) {
          if (!validator.isURL) {
            throw new Error("not a valid URL");
          }
        },
      },
    ],
  },
  color: {
    type: Array,
    required: true,
    minlength: 6,
  },
  font: {
    type: String,
    required: true,
  },
});
export { siteSchema };
