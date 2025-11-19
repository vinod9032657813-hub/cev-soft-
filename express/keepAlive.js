import https from 'https';

const RENDER_URL = 'https://cev-soft.onrender.com';

function pingServer() {
    const timestamp = new Date().toLocaleString();
    https.get(RENDER_URL, (res) => {
        console.log(`✅ [${timestamp}] Ping successful: ${res.statusCode}`);
    }).on('error', (err) => {
        console.error(`❌ [${timestamp}] Ping failed:`, err.message);
    });
}

// Ping every 5 minutes (300000 ms) - More frequent to prevent sleep
setInterval(pingServer, 300000);

// Initial ping on startup
pingServer();

console.log('🔄 Keep-alive service started. Pinging every 5 minutes...');
