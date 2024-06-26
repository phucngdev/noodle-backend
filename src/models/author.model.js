const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Noodle",
    },
  ],
});

let Author = mongoose.model("Author", authorSchema);
module.exports = { Author };
