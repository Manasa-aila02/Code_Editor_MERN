const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Reference to the user who created the folder
    required: true,
  },
  playgrounds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Playgrounds", // Reference to the playgrounds in this folder
    },
  ],
});

const Folder = mongoose.model("Folders", folderSchema);

module.exports = Folder;
