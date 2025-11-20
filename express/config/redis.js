import { createClient } from 'redis';

let redisClient = null;

const connectRedis = async () => {
    try {
        // Only use Redis if URL is provided (optional for development)
        if (!process.env.REDIS_URL) {
            console.log('⚠️  Redis URL not configured - caching disabled');
            return null;
        }

        redisClient = createClient({
            url: process.env.REDIS_URL,
            socket: {
                connectTimeout: 10000,
                reconnectStrategy: (retries) => {
                    if (retries > 3) {
                        console.log('❌ Redis connection failed after 3 retries');
                        return new Error('Redis connection failed');
                    }
                    return retries * 1000;
                }
            }
        });

        redisClient.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        redisClient.on('connect', () => {
            console.log('🔄 Redis connecting...');
        });

        redisClient.on('ready', () => {
            console.log('✅ Redis connected and ready');
        });

        await redisClient.connect();
        return redisClient;
    } catch (error) {
        console.error('❌ Redis connection error:', error.message);
        return null;
    }
};

// Cache middleware
const cacheMiddleware = (duration = 300) => {
    return async (req, res, next) => {
        if (!redisClient || !redisClient.isOpen) {
            return next();
        }

        const key = `cache:${req.originalUrl}`;

        try {
            const cachedData = await redisClient.get(key);
            
            if (cachedData) {
                console.log(`✅ Cache HIT: ${key}`);
                return res.json(JSON.parse(cachedData));
            }

            console.log(`❌ Cache MISS: ${key}`);
            
            // Store original res.json
            const originalJson = res.json.bind(res);
            
            // Override res.json
            res.json = (data) => {
                // Cache the response
                redisClient.setEx(key, duration, JSON.stringify(data))
                    .catch(err => console.error('Cache set error:', err));
                
                // Send response
                return originalJson(data);
            };

            next();
        } catch (error) {
            console.error('Cache middleware error:', error);
            next();
        }
    };
};

// Clear cache by pattern
const clearCache = async (pattern = '*') => {
    if (!redisClient || !redisClient.isOpen) return;
    
    try {
        const keys = await redisClient.keys(`cache:${pattern}`);
        if (keys.length > 0) {
            await redisClient.del(keys);
            console.log(`🗑️  Cleared ${keys.length} cache entries`);
        }
    } catch (error) {
        console.error('Clear cache error:', error);
    }
};

export { connectRedis, redisClient, cacheMiddleware, clearCache };
