import { useState } from "react";

export default function SectionCard({ section }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, marginBottom: 10, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)}
        style={{ padding: "10px 16px", cursor: "pointer", background: "#f9f9f9", display: "flex", justifyContent: "space-between" }}>
        <span><strong>{section.type}</strong>  {section.title}</span>
        <span>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: 16 }}>
          <div>
            <p style={{ color: "#999", fontSize: 12, marginBottom: 6 }}>ORIGINAL</p>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, background: "#f5f5f5", padding: 10, borderRadius: 6 }}>{section.original}</pre>
          </div>
          <div>
            <p style={{ color: "green", fontSize: 12, marginBottom: 6 }}>ENHANCED</p>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, background: "#f0fff4", padding: 10, borderRadius: 6 }}>{section.enhanced}</pre>
          </div>
          {section.improvements?.length > 0 && (
            <div style={{ gridColumn: "1 / -1" }}>
              <p style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>What changed:</p>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {section.improvements.map((imp, i) => <li key={i} style={{ fontSize: 12 }}>{imp}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}