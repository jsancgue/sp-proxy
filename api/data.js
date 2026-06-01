import { put, head } from "@vercel/blob";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Power Automate POSTs data here
  if (req.method === "POST") {
    const secret = req.headers["x-write-secret"];
    if (secret !== "mysecret123") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const blob = await put("sharepoint-data.json", JSON.stringify(req.body), {
      access: "public",
      contentType: "application/json",
      allowOverwrite: true,
    });
    return res.status(200).json({ ok: true, url: blob.url });
  }

  // Lovable GETs data here
  const blobRes = await fetch(process.env.BLOB_PUBLIC_URL);
  const data = await blobRes.json();
  res.setHeader("Cache-Control", "s-maxage=55");
  return res.status(200).json(data);
}