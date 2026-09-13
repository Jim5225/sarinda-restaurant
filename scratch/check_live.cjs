const https = require('https');

function get(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
  });
}

async function main() {
  const page = await get('https://sarinda-restaurant.vercel.app');
  const match = page.body.match(/src="(\/assets\/index-[^"]+\.js)"/);
  console.log('Live script:', match ? match[1] : 'Not found');

  const wa = await get('https://sarinda-restaurant.vercel.app/api/whatsapp?hub.mode=subscribe&hub.verify_token=sarinda_whatsapp_token_2026&hub.challenge=VERIFIED_123');
  console.log('WhatsApp GET status:', wa.status, 'body:', wa.body);
}

main();
