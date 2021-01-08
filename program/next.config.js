module.exports = {
    env: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,

        // Use Firebase Local Emulator Suite
        useEmulators: process.env.USE_EMULATORS,
    },
};
