export default async function handler(req, res) {
  const { url } = req.query;
  
  // Проверка на наличие ссылки в запросе
  if (!url) return res.status(400).send('No URL provided');

  try {
    // Сервер Vercel скачивает ваш плейлист (даже если он http)
    const response = await fetch(url);
    const data = await response.text();
    
    // Установка заголовков для обхода защиты браузера
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    
    // Отправка данных обратно в плеер как безопасный HTTPS-трафик
    res.status(200).send(data);
  } catch (error) {
    // В случае сбоя возвращаем ошибку
    res.status(500).send('Proxy error: ' + error.message);
  }
}
