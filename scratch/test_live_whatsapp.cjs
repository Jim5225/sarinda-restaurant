const https = require('https');

function test(payload) {
  return new Promise((resolve) => {
    const data = JSON.stringify(payload);
    const req = https.request('https://sarinda-restaurant.vercel.app/api/whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
        catch { resolve({ status: res.statusCode, body }); }
      });
    });
    req.on('error', (e) => resolve({ error: e.message }));
    req.write(data);
    req.end();
  });
}

async function run() {
  console.log('--- TEST 1: Customer asks for Biryani on WhatsApp ---');
  const res1 = await test({
    prompt: '2 ta kacchi biryani lagbe',
    from: '8801712121434'
  });
  console.log('Status:', res1.status);
  console.log('Reply:\n' + res1.data?.reply);

  console.log('\n--- TEST 2: Meta Webhook payload format ---');
  const res2 = await test({
    object: 'whatsapp_business_account',
    entry: [{
      changes: [{
        value: {
          messaging_product: 'whatsapp',
          metadata: { phone_number_id: '123456789' },
          contacts: [{ wa_id: '8801712121434' }],
          messages: [{
            from: '8801712121434',
            text: { body: 'ajker menu ki ki ache?' }
          }]
        }
      }]
    }]
  });
  console.log('Status:', res2.status);
  console.log('Reply:\n' + res2.data?.reply);
}

run();
