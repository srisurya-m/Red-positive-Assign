import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter Your name"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter Your ph number"],
  },
  email: {
    type: String,
    unique: [true, "Email id already exits"],
    required: [true, "Please enter Email"],
  },
  hobbies: {
    type: String,
    required: [true, "Please enter your address"],
  },
},
{
  timestamps: true,
});

export const Details = mongoose.model("Details", schema);