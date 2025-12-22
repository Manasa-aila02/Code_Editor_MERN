const express = require("express");
const connectDB = require("./db");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const verifyToken = require("./middleware/auth");
const app = express();
connectDB();

app.use(cors());
app.use(express.json({ extended: false, limit: "50mb" }));

app.use("/api/userRoutes", require("./routes/UserRoutes"));
app.use("/api/folders", verifyToken, require("./routes/folderRoutes"));
app.use("/api/playgrounds", verifyToken, require("./routes/playgroundRoutes"));
app.use("/api/askAIAssistant",verifyToken, require("./routes/aiRoutes"));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));