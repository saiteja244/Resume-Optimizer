const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  originalText: { type: String, required: true },
  enhancedText:  { type: String, default: "" },
  fileName:      { type: String, default: "resume.txt" },
  atsScoreBefore: { type: Number, default: 0 },
  atsScoreAfter:  { type: Number, default: 0 },
  keywords:      [String],
  sections:      [mongoose.Schema.Types.Mixed],
  status:        { type: String, enum: ["pending","processing","done","failed"], default: "pending" },
  createdAt:     { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resume", ResumeSchema);