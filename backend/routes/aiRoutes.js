const express=require("express");
const askAI = require("../Controllers/aiController");

const router = express.Router();
router.post("/askAI", askAI);


module.exports = router;