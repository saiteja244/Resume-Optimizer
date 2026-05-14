const BASE = import.meta.env.VITE_API_BASE;

export async function uploadResume(originalText, fileName) {
  const res = await fetch(`${BASE}/resumes/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalText, fileName }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data;
}

export async function optimizeResume(resumeId) {
  const res = await fetch(`${BASE}/resumes/${resumeId}/optimize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Optimization failed");
  return data;
}

export async function getResume(resumeId) {
  const res = await fetch(`${BASE}/resumes/${resumeId}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export async function getHistory() {
  const res = await fetch(`${BASE}/resumes`);
  return res.json();
}