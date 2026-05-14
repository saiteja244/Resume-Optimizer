import SectionCard from "./SectionCard";

export default function ResultsSection({ result, onReset }) {
  const downloadResume = () => {
    const text = result.sections.map(s => `${s.title || ""}\n${s.enhanced}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a    = document.createElement("a");
    a.href     = URL.createObjectURL(blob);
    a.download = "optimized_resume.txt";
    a.click();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 32, marginBottom: 24 }}>
        <div>ATS Before: <strong>{result.atsScoreBefore}</strong>/100</div>
        <div>ATS After:  <strong>{result.atsScoreAfter}</strong>/100</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <strong>Keywords:</strong>{" "}
        {result.keywords?.map(k => <span key={k} style={{ margin: "0 4px", background: "#e0f0ff", padding: "2px 8px", borderRadius: 4 }}>{k}</span>)}
      </div>

      {result.sections?.map((sec, i) => <SectionCard key={i} section={sec} />)}

      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button onClick={downloadResume} style={{ flex: 1, padding: 12 }}>⬇ Download Optimized Resume</button>
        <button onClick={onReset}        style={{ flex: 1, padding: 12 }}>Optimize Another</button>
      </div>
    </div>
  );
}