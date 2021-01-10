const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: !!process.env.ANALYZE,
});

const nextConfig = {
    env: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,

        // Use Firebase Local Emulator Suite
        useEmulators: process.env.USE_EMULATORS,
    },
    dontAutoRegisterSw: true,
    workboxOpts: {
        swDest: 'static/service-worker.js',
    },
};

module.exports = withBundleAnalyzer(nextConfig);
