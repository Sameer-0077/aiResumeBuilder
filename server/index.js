const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const resumeRoutes = require("./routes/resumeRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", resumeRoutes);

app.get("/", (req, res) => {
  res.send("Hey there!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
