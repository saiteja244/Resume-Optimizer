import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Point to the PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }

  return fullText.trim();
}

export default function UploadSection({ onSubmit, error }) {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const fileRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    setPdfError("");
    setFileName(file.name);

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      setLoading(true);
      try {
        const extracted = await extractTextFromPDF(file);
        if (!extracted) {
          setPdfError("Could not extract text from this PDF. Try a text-based PDF or paste your resume manually.");
          setLoading(false);
          return;
        }
        setText(extracted);
      } catch (err) {
        setPdfError("Failed to read PDF: " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // .txt or .md — plain text read
      const reader = new FileReader();
      reader.onload = (e) => setText(e.target.result);
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div
        onClick={() => !loading && fileRef.current.click()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "2px dashed #ccc", padding: 40, textAlign: "center",
          cursor: loading ? "wait" : "pointer", borderRadius: 8,
          background: loading ? "#f9f9f9" : "white"
        }}
      >
        {loading
          ? "⏳ Extracting text from PDF..."
          : fileName
          ? `✓ ${fileName}`
          : "Drop your resume here (PDF, TXT, MD) or click to upload"}
        <input
          ref={fileRef} type="file" accept=".txt,.md,.pdf"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {pdfError && <p style={{ color: "orange", marginTop: 8 }}>{pdfError}</p>}

      <p style={{ textAlign: "center", color: "#999", margin: "12px 0" }}>— or paste below —</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your resume text here..."
        style={{ width: "100%", minHeight: 200, padding: 12, fontSize: 13, boxSizing: "border-box" }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={() => onSubmit(text, fileName)}
        disabled={!text.trim() || loading}
        style={{ marginTop: 12, width: "100%", padding: 12, fontSize: 15 }}
      >
        Optimize Resume →
      </button>
    </div>
  );
}