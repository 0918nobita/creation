// Side effects for using Firebase Web SDK
import 'firebase/auth';
import 'firebase/database';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';

import { FirebaseContextProvider } from '../contexts/FirebaseContext';

import 'tailwindcss/tailwind.css';

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;
        if (process.env.NODE_ENV !== 'development') {
            void navigator.serviceWorker
                .register('/service-worker.js', { scope: '/' })
                .then((regisration) => {
                    console.log(
                        'Service Worker regisration successful with scope: ',
                        regisration.scope
                    );
                });
        }
    }, []);

    return (
        <>
            <Head>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <FirebaseContextProvider>
                <Component {...pageProps} />
            </FirebaseContextProvider>
        </>
    );
};

export default MyApp;
