const Resume = require("../models/Resume");
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are an expert resume writer and ATS (Applicant Tracking System) optimization specialist.

Enhance the resume content to be ATS-friendly with strong action verbs, quantified results, and industry keywords.

STRICT RULES:
- Keep ALL names, job titles, company names, dates, contact info EXACTLY the same
- Only improve bullet points, descriptions, and summaries
- Use strong action verbs: Spearheaded, Engineered, Delivered, Optimized, Accelerated
- Remove weak phrases like "responsible for", "worked on", "helped with"
- Add quantifiable results where logical

You MUST return ONLY a valid JSON object. No markdown, no backticks, no extra text before or after.
The JSON must follow this exact structure:
{
  "sections": [
    {
      "type": "header",
      "title": null,
      "original": "original text here",
      "enhanced": "enhanced text here",
      "improvements": ["improvement 1", "improvement 2"]
    }
  ],
  "atsScore": { "before": 55, "after": 82 },
  "keywordsFound": ["keyword1", "keyword2"],
  "topImprovements": ["improvement 1", "improvement 2", "improvement 3"]
}`;

// POST /api/resumes/upload
exports.uploadResume = async (req, res) => {
  try {
    const { originalText, fileName } = req.body;

    if (!originalText || originalText.trim().length === 0) {
      return res.status(400).json({ error: "No resume text provided" });
    }

    console.log("📄 Resume received:", fileName, "| Length:", originalText.length);

    const resume = await Resume.create({
      originalText: originalText.trim(),
      fileName: fileName || "resume.txt",
      status: "pending",
    });

    res.status(201).json({ resumeId: resume._id, message: "Resume saved" });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// POST /api/resumes/:id/optimize
exports.optimizeResume = async (req, res) => {
  let resume;
  try {
    resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: "Resume not found" });

    console.log("🚀 Starting optimization for:", resume.fileName);
    resume.status = "processing";
    await resume.save();

    // ✅ Call Groq API
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Optimize this resume and return ONLY the JSON, no other text:\n\n${resume.originalText}`,
        },
      ],
      max_tokens: 4000,
      temperature: 0.3,
    });

    const rawText = response.choices[0].message.content;
    console.log("✅ Groq responded.");
    console.log("📝 Raw response (first 300 chars):", rawText.substring(0, 300));

    // Clean response — strip markdown code fences if present
    let cleaned = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    // Extract JSON object
    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Groq did not return valid JSON. Raw: " + rawText.substring(0, 200));
    }

    cleaned = cleaned.substring(jsonStart, jsonEnd + 1);

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("❌ JSON parse failed:", parseErr.message);
      console.error("Cleaned text:", cleaned.substring(0, 500));
      throw new Error("Failed to parse Groq response as JSON: " + parseErr.message);
    }

    console.log("✅ Parsed successfully. Sections:", parsed.sections?.length);

    // Build enhanced full text
    const enhancedText = (parsed.sections || [])
      .map((s) => `${s.title ? s.title + "\n" : ""}${s.enhanced || ""}`)
      .join("\n\n");

    // Save to MongoDB
    resume.sections       = parsed.sections       || [];
    resume.enhancedText   = enhancedText;
    resume.atsScoreBefore = parsed.atsScore?.before || 0;
    resume.atsScoreAfter  = parsed.atsScore?.after  || 0;
    resume.keywords       = parsed.keywordsFound   || [];
    resume.status         = "done";
    await resume.save();

    console.log("💾 Saved to MongoDB. ATS:", resume.atsScoreBefore, "→", resume.atsScoreAfter);

    res.json(resume);
  } catch (err) {
    console.error("❌ Optimization error:", err.message);
    if (resume) {
      await Resume.findByIdAndUpdate(resume._id, { status: "failed" });
    }
    res.status(500).json({ error: err.message });
  }
};

// GET /api/resumes/:id
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ error: "Not found" });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/resumes
exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find()
      .sort({ createdAt: -1 })
      .select("-originalText -enhancedText -sections");
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};