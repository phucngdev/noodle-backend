const mongoose = require("mongoose");

const noodleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ingredient: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  { timestamps: true }
);

let Noodle = mongoose.model("Noodle", noodleSchema);
module.exports = { Noodle };
