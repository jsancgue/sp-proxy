export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  try {
    const response = await fetch(
      "https://everisgroup-my.sharepoint.com/:u:/g/personal/jsancgue_emeal_nttdata_com/IQCHhdKZaDOsSIBcd82PL71QAeyqIwkbvItgCdVbj1yJo28?e=Gud7S9&download=1",
      {
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json, text/plain, */*"
        }
      }
    );

    const text = await response.text();
    const data = JSON.parse(text);
    
    res.setHeader("Cache-Control", "s-maxage=55");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}