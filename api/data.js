export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const response = await fetch(
    "https://everisgroup-my.sharepoint.com/:u:/g/personal/jsancgue_emeal_nttdata_com/IQCHhdKZaDOsSIBcd82PL71QAeyqIwkbvItgCdVbj1yJo28?e=GqTJas&download=1"
  );

  const data = await response.json();
  res.setHeader("Cache-Control", "s-maxage=55");
  return res.status(200).json(data);
}