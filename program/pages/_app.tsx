import firebase from 'firebase/app';
import 'firebase/auth';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import 'tailwindcss/tailwind.css';

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
};

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;
        void navigator.serviceWorker.register('/sw.js').then((regisration) => {
            console.log(
                'Service Worker regisration successful with scope: ',
                regisration.scope
            );
        });
    }, []);

    const [firebaseApp, setFirebaseApp] = useState<firebase.app.App | null>(
        null
    );

    useEffect(() => {
        if (firebaseApp) {
            return () => {
                void firebaseApp?.delete();
            };
        }
        setFirebaseApp(firebase.initializeApp(firebaseConfig));
    }, [firebaseApp]);

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
