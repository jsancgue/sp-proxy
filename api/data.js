export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const response = await fetch(
      "https://everisgroup-my.sharepoint.com/:u:/g/personal/jsancgue_emeal_nttdata_com/IQCHhdKZaDOsSIBcd82PL71QAeyqIwkbvItgCdVbj1yJo28?e=GqTJas&download=1"
    );

    const text = await response.text();
    console.log("OneDrive status:", response.status);
    console.log("OneDrive body:", text.slice(0, 500));

    const data = JSON.parse(text);
    res.setHeader("Cache-Control", "s-maxage=55");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(200).json({ error: err.message });
  }
}