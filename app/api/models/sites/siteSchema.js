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
  Email: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("not a valid Email");
        }
      },
    },
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [15, "Title must be at most 15 characters"],
    validator(value) {
      if (!validator.isAlphanumeric(value)) {
        throw new Error("Title must be alphanumeric");
      }
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
          if (value && !validator.isURL(value)) {
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
        if (!validator.isURL(value)) {
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
          if (!validator.isURL(value)) {
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
