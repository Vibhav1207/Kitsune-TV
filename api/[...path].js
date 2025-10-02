// Simple Vercel function to proxy anime API requests
export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Extract path from the request URL
    const urlPath = req.url.replace('/api/', '');
    const apiUrl = `https://eren-world.onrender.com/api/${urlPath}`;
    
    console.log('Fetching:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', response.status, data);
      return res.status(response.status).json({ error: 'API Error', details: data });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}