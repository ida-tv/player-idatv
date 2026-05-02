export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) return res.status(400).send('URL is required');

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/plain, text/html, application/xml, */*'
      }
    });

    if (!response.ok) throw new Error(`Status: ${response.status}`);

    const text = await response.text();

    // Заголовки для браузера, чтобы он не блокировал данные
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    return res.status(200).send(text);
  } catch (error) {
    console.error('Proxy Error:', error.message);
    return res.status(500).send('Proxy failed to fetch data');
  }
}
