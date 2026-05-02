export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send('No URL provided');

  try {
    const response = await fetch(url);
    const data = await response.text();
    
    // Разрешаем плееру забирать данные
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Proxy error: ' + error.message);
  }
}
