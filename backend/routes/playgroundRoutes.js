const express = require("express");
const {
  getPlaygrounds,
  createPlayground,
  editPlayground,
  editPlaygroundTitle,
  deletePlayground,
} = require("../Controllers/playgroundController");

const router = express.Router();

router.post("/:folderId", createPlayground);
router.get("/folders/:folderId/playgrounds", getPlaygrounds);
router.put("/:playgroundId/:folderId", editPlayground);
router.put("/:playgroundId", editPlaygroundTitle);
router.delete("/:playgroundId/:folderId", deletePlayground);

module.exports = router;
