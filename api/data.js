import { put, list } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-write-secret");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    if (req.headers["x-write-secret"] !== "mysecret123") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await put("sharepoint-data.json", JSON.stringify(req.body), {
      access: "public",
      contentType: "application/json",
      allowOverwrite: true,
    });
    return res.status(200).json({ ok: true });
  }

  const { blobs } = await list();
  const blob = blobs.find(b => b.pathname === "sharepoint-data.json");
  if (!blob) return res.status(200).json({ value: [] });

  const response = await fetch(blob.url);
  const data = await response.json();
  res.setHeader("Cache-Control", "s-maxage=55");
  return res.status(200).json(data);
}