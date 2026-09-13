const https = require('https');

https.get('https://sarinda-restaurant.vercel.app', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    const match = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
    console.log('Live script:', match ? match[1] : 'Not found');
  });
});
