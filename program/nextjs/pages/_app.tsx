// Side effects for using Firebase Web SDK
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';

import { FirebaseContextProvider } from '../contexts/FirebaseContext';

import 'tailwindcss/tailwind.css';

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;
        void navigator.serviceWorker
            .register('/service-worker.js')
            .then((regisration) => {
                console.log(
                    'Service Worker regisration successful with scope: ',
                    regisration.scope
                );
            });
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
