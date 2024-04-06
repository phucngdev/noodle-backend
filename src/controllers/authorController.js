const { Author } = require("../models/author.model");
const { Noodle } = require("../models/noodles.model");

module.exports.addAuthor = async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    const saveAuthor = await newAuthor.save();
    res.status(201).json({ message: "Successfully!", saveAuthor });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.getAllAuthor = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json({ message: "Successfully!", authors });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};
module.exports.getAnAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate("products");
    res.status(200).json({ message: "Successfully!", author });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    await author.updateOne({ $set: req.body });
    res.status(200).json({ message: "Successfully!", author });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.deleteAuthor = async (req, res) => {
  try {
    await Author.updateMany({ author: req.params.id }, { author: null });
    const author = await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Successfully!", author });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};
