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

    // FIXME: Unnecessarily complicated side effects
    const [firebaseApp, setFirebaseApp] = useState<firebase.app.App | null>(
        null
    );
    const [firebaseAuth, setFirebaseAuth] = useState<firebase.auth.Auth | null>(
        null
    );
    useEffect(() => {
        if (firebaseApp) {
            if (firebaseAuth) return;

            const auth = firebaseApp.auth();
            if (process.env.useEmulators) {
                auth.useEmulator('http://localhost:9099');
            }
            setFirebaseAuth(auth);
            return;
        }

        setFirebaseApp(firebase.initializeApp(firebaseConfig));
    }, [firebaseApp, firebaseAuth]);

    return (
        <>
            <Head>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <Component
                {...pageProps}
                firebaseApp={firebaseApp}
                firebaseAuth={firebaseAuth}
            />
        </>
    );
};

export default MyApp;
