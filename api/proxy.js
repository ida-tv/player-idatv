export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send('No URL');

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Referer': url
      }
    });

    const data = await response.text();
    
    // Чистим ссылки внутри плейлиста, если они относительные
    const cleanData = data.replace(/^(?!http|#|\s)/mg, (match) => {
        const baseUrl = new URL(url);
        return baseUrl.origin + baseUrl.pathname.substring(0, baseUrl.pathname.lastIndexOf('/') + 1);
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(cleanData);
  } catch (e) {
    res.status(500).send('Proxy Error');
  }
}
