module.exports = {
    env: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
    },
    webpack: (config) => {
        config.resolve.alias['firebaseui'] = 'firebaseui-ja';
        return config;
    },
};
