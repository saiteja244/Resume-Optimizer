require("dotenv").config();
const express      = require("express");
const cors         = require("cors");
const connectDB    = require("./config/db");
const resumeRoutes = require("./routes/resume");

const app = express();
app.use(cors({ origin:[
    "http://localhost:5173",
    /\.vercel\.app$/,
  ],
  credentials: true,
             }));
app.use(express.json({ limit: "5mb" }));
app.use("/api/resumes", resumeRoutes);

// ✅ Connect to MongoDB FIRST, then start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err.message);
  process.exit(1);
});
module.exports = app;
