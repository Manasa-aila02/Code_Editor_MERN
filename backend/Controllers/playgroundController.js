const Playground = require("../models/Playgrounds");
const Folder = require("../models/Folders");

const getPlaygrounds = async (req, res) => {
  const { folderId, userId } = req.params; 
  try {
      const folder = await Folder.findOne({ _id: folderId, userId }) 
          .populate("playgrounds");

      if (!folder) {
          return res.status(404).json({ msg: "Folder not found or access denied" });
      }

      res.status(200).json(folder.playgrounds);
  } catch (error) {
      console.error("Error fetching playgrounds:", error);
      res.status(400).json({ msg: "Error fetching playgrounds", error });
  }
};


const createPlayground = async (req, res) => {
  const { folderId, userId, title, language, code } = req.body;

  if (!folderId || !title) {
      return res.status(400).json({ msg: "Folder ID and Title are required." });
  }

  try {
      const playground = new Playground({ userId, title, language, code, folderId });
      await playground.save();

      const folder = await Folder.findById(folderId);
      if (!folder) {
          return res.status(404).json({ msg: "Folder not found" });
      }

      folder.playgrounds.push(playground._id);
      await folder.save();

      res.status(201).json(playground);
  } catch (error) {
      console.error("Error creating playground:", error);
      res.status(400).json({ msg: "Error creating playground", error });
  }
};


const editPlaygroundTitle = async (req, res) => {
  const { playgroundId } = req.params; 
  const { title } = req.body; 

  try {
    // Validate title
    if (!title || title.trim() === "") {
      return res.status(400).json({ msg: "Title cannot be empty" });
    }

    // Find and update the playground title
    const updatedPlayground = await Playground.findByIdAndUpdate(
      playgroundId,
      { title }, 
      { new: true } 
    );

    // Check if the playground exists
    if (!updatedPlayground) {
      return res.status(404).json({ msg: "Playground not found" });
    }

   
    res.status(200).json(updatedPlayground);
  } catch (error) {
    console.error("Error updating playground title:", error);
    res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

// Edit playground code
const editPlayground = async (req, res) => {
  const { folderId, playgroundId } = req.params;
  const { code, language } = req.body;
  try {
    const folder = await Folder.findById(folderId);
    const updatedPlayground = await Playground.findByIdAndUpdate(
      playgroundId,
      { code, language },
      { new: true }
    );
    res.status(200).json(updatedPlayground);
  } catch (error) {
    res.status(400).json({ msg: "Error editing playground", error });
  }
};

// Delete playground
const deletePlayground = async (req, res) => {
  const { playgroundId, folderId} = req.params;
  try {
    await Playground.findByIdAndDelete(playgroundId);
    const folder = await Folder.findById(folderId);
    folder.playgrounds = folder.playgrounds.filter(
      (pg) => pg._id.toString() !== playgroundId
    );
    await folder.save();
    res.status(200).json({ msg: "Playground deleted" });
  } catch (error) {
    res.status(400).json({ msg: "Error deleting playground", error });
  }
};

module.exports = { getPlaygrounds, createPlayground, editPlayground, editPlaygroundTitle, deletePlayground };
