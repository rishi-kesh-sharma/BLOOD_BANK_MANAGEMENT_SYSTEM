const mongoose = require("mongoose");
// CREATE SCHEMA FOR Contact
const ContactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: { type: String },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
