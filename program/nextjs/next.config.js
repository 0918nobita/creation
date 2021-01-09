const WorkboxPlugin = require('workbox-webpack-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: !!process.env.ANALYZE,
});

const baseConfig = {
    env: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,

        // Use Firebase Local Emulator Suite
        useEmulators: process.env.USE_EMULATORS,
    },
    webpack: (config, { dev }) => {
        if (!dev) {
            config.plugins.push(
                new WorkboxPlugin.GenerateSW({
                    cacheId: 'workbox',
                    swDest: 'service-worker.js',
                    skipWaiting: true,
                    clientsClaim: false,
                    runtimeCaching: [
                        {
                            urlPattern: '/',
                            handler: 'NetworkFirst',
                            options: {
                                cacheName: 'page',
                            },
                        },
                        {
                            urlPattern: /\.(png|json)/,
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'assets',
                            },
                        },
                    ],
                })
            );
        }
        return config;
    },
};

module.exports = withBundleAnalyzer(baseConfig);
