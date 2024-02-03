const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const { Schema, model } = require("mongoose");

const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required,
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

const subscriptionListSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionListSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };