const { Author } = require("../models/author.model");
const { Noodle } = require("../models/noodles.model");

module.exports.addNoodle = async (req, res) => {
  try {
    const newNoodle = new Noodle(req.body);
    const saveNoodle = await newNoodle.save();
    if (req.body.author) {
      const author = Author.findById(req.body.author);
      await author.updateOne({ $push: { products: saveNoodle._id } });
    }
    res.status(201).json({ message: "Successfully!", saveNoodle });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.getAllNoodle = async (req, res) => {
  try {
    const noodles = await Noodle.find();
    res.status(200).json({ message: "Successfully!", noodles });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.getANoodle = async (req, res) => {
  try {
    const noodle = await Noodle.findById(req.params.id).populate("author");
    res.status(200).json({ message: "Successfully!", noodle });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.updateNoodle = async (req, res) => {
  try {
    const noodle = await Noodle.findById(req.params.id);
    await noodle.updateOne({ $set: req.body });
    res.status(200).json({ message: "Successfully!", noodle });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

module.exports.deleteNoodle = async (req, res) => {
  try {
    await Author.updateMany(
      { products: req.params.id },
      { $pull: { products: req.params.id } }
    );
    const noodle = await Noodle.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Successfully!", noodle });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};
