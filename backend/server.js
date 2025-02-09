const express = require("express");
const connectDB = require("./db");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const app = express();
connectDB();

app.use(cors());
app.use(express.json({ extended: false, limit: "50mb" }));

app.use("/api/userRoutes", require("./routes/UserRoutes"));
app.use("/api/userRoutes", require("./routes/UserRoutes"));
app.use("/api/folders", require("./routes/folderRoutes"));
app.use("/api/playgrounds",require("./routes/playgroundRoutes"));



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));