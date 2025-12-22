const Folder = require("../models/Folders");
const mongoose = require("mongoose");
const Playground = require("../models/Playgrounds");

// Creating a folder
const createFolder = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id; 
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ msg: "Invalid user ID format",userId,title });
  }
  try {
    const folder = new Folder({ userId, title });
    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    res.status(400).json({ msg: "Error creating folder", error });
  }
};

// Get all folders for a user
const getFolders = async (req, res) => {
  const userId = req.user.id; // comes from auth middleware
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid user ID format" });
    }
    const folders = await Folder.find({ userId }).populate("playgrounds");
    res.status(200).json(folders);
  } catch (error) {
    console.error("Error fetching folders:", error);
    res.status(400).json({ msg: "Error fetching folders", error });
  }
};


// Edit folder title
const editFolderTitle = async (req, res) => {
    const { folderId } = req.params;
    const { title} = req.body; 
    const userId = req.user.id;
    try {
      const folder = await Folder.findById(folderId);
      
      if (!folder) {
        return res.status(404).json({ msg: "Folder not found" });
      }
      if (folder.userId.toString() !== userId) {
        return res.status(403).json({ msg: "Unauthorized: You do not have permission to edit this folder" });
      }
  
      const updatedFolder = await Folder.findByIdAndUpdate(
        folderId,
        { title }, 
        { new: true } 
      );
  
      res.status(200).json(updatedFolder);
    } catch (error) {
      res.status(400).json({ msg: "Error editing folder", error });
    }
  };


  const deleteFolder = async (req, res) => {
  const { folderId } = req.params;
  const userId = req.user.id;

  try {
    const folder = await Folder.findById(folderId);
    if (!folder) return res.status(404).json({ msg: "Folder not found" });

    if (folder.userId.toString() !== userId) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    // Step 1: Delete all playgrounds inside this folder
    await Playground.deleteMany({ folderId });

    // Step 2: Delete the folder
    await Folder.findByIdAndDelete(folderId);

    res.status(200).json({ msg: "Folder and its playgrounds deleted successfully" });

  } catch (error) {
    console.error(" Error deleting folder:", error);
    res.status(400).json({ msg: "Error deleting folder", error });
  }
};
// Delete folder
// const deleteFolder = async (req, res) => {
//     const { folderId } = req.params;
//     const userId  = req.user.id; 
    
//     try {
     
//       const folder = await Folder.findById(folderId);
//       if (folder.userId.toString() !== userId) {
//         return res.status(403).json({ msg: "Unauthorized" }); 
//       }
  
//       await Folder.findByIdAndDelete(folderId);
//       res.status(200).json({ msg: "Folder deleted" });
//     } catch (error) {
//       res.status(400).json({ msg: "Error deleting folder", error });
//     }
//   };
  
module.exports = { createFolder, getFolders, editFolderTitle, deleteFolder };
