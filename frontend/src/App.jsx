import { useState } from "react";
import UploadSection  from "./components/UploadSection";
import ResultsSection from "./components/ResultsSection";
import { uploadResume, optimizeResume } from "./services/api";

export default function App() {
  const [stage, setStage]   = useState("upload");
  const [result, setResult] = useState(null);
  const [error, setError]   = useState("");

  const handleOptimize = async (text, fileName) => {
    setError("");
    setStage("processing");
    try {
      const { resumeId } = await uploadResume(text, fileName);
      console.log("Uploaded, resumeId:", resumeId);

      const data = await optimizeResume(resumeId);
      console.log("Optimized result:", data);

      setResult(data);
      setStage("results");
    } catch (e) {
      console.error("Full error:", e);
      setError(e.message);   // now shows the REAL error, not just "Optimization failed"
      setStage("upload");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1>Resume Optimizer</h1>
      {stage === "upload"     && <UploadSection onSubmit={handleOptimize} error={error} />}
      {stage === "processing" && (
        <div style={{ textAlign: "center", padding: 60 }}>
          <p style={{ fontSize: 18 }}>⏳ Optimizing your resume...</p>
          <p style={{ color: "#999" }}>This takes 15–30 seconds</p>
        </div>
      )}
      {stage === "results" && <ResultsSection result={result} onReset={() => setStage("upload")} />}
    </div>
  );
}