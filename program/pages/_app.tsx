import firebase from 'firebase/app';
import 'firebase/auth';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import 'tailwindcss/tailwind.css';

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
};

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
    const [firebaseApp, setFirebaseApp] = useState<firebase.app.App | null>(null);

    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;
        navigator.serviceWorker.register('/sw.js').then((regisration) => {
            console.log('Service Worker regisration successful with scope: ', regisration.scope);
        });

        setFirebaseApp(firebase.initializeApp(firebaseConfig));

        return () => {
            firebaseApp?.delete();
        };
    }, []);

    return (
        <>
            <Head>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <Component {...pageProps} firebaseApp={firebaseApp} />
        </>
    );
};

export default MyApp;
