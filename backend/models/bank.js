const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// CREATE SCHEMA FOR BANK
const BankSchema = mongoose.Schema(
  {
    bankname: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    contact: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "this is default avatar",
    },
    licenseDocument: {
      type: String,
      default: "this is default document",
      required: true,
    },
    estd: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["national", "regional", "district"],
      default: "district",
      required: true,
    },
    socialMediaHandles: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedIn: String,
    },
    website: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Bank = mongoose.model("Bank", BankSchema);
module.exports = Bank;
