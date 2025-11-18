import https from 'https';

const RENDER_URL = 'https://cev-soft.onrender.com';

function pingServer() {
    https.get(RENDER_URL, (res) => {
        console.log(`✅ Ping successful: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error('❌ Ping failed:', err.message);
    });
}

// Ping every 10 minutes (600000 ms)
setInterval(pingServer, 600000);

console.log('🔄 Keep-alive service started. Pinging every 10 minutes...');
