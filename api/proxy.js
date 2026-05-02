export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send('No URL provided');

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': '*/*',
        'Connection': 'keep-alive'
      }
    });

    const contentType = response.headers.get('content-type');
    const data = await response.arrayBuffer(); // Используем буфер для поддержки любых данных

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', contentType || 'text/plain');
    res.status(200).send(Buffer.from(data));
  } catch (error) {
    res.status(500).send('Proxy error: ' + error.message);
  }
}
