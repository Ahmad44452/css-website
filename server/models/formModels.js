const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const formSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true
  },
  secondName: {
    type: String,
    required: [true, "Second name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    validate(value) {
      if (!isEmail(value)) {
        throw new Error("Invalid email")
      }
    }
  },
  batch: {
    type: String,
    required: [true, "Batch is required"],
    trim: true
  },
  registrationNo: {
    type: String,
    required: [true, "Reistration number is required"],
    trim: true
  },
  phoneNo: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const FormModel = mongoose.model("form", formSchema);
module.exports = { FormModel };