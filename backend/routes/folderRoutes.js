const express = require("express");
const {
  createFolder,
  getFolders,
  editFolderTitle,
  deleteFolder,
} = require("../controllers/folderController");

const router = express.Router();

router.post("/", createFolder);
router.get("/", getFolders);
router.put("/:folderId", editFolderTitle);
router.delete("/:folderId", deleteFolder);

module.exports = router;
