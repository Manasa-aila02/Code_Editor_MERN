const mongoose = require("mongoose");

const playgroundSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String, // Code for the playground
    required: true,
  },
  language: {
    type: String, // Language used in the playground (e.g. cpp, python, java)
    required: true,
  },
  folderId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folders",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Reference to the user who created this playground
    required: true,
  },
});

const Playground = mongoose.model("Playgrounds", playgroundSchema);

module.exports = Playground;