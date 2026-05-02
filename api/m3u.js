export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send("Нет URL");
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/plain");

    res.status(200).send(text);

  } catch (e) {
    res.status(500).send("Ошибка загрузки M3U");
  }
}
