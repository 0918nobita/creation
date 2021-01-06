import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';

import 'tailwindcss/tailwind.css';

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;
        navigator.serviceWorker.register('/sw.js').then((regisration) => {
            console.log('Service Worker regisration successful with scope: ', regisration.scope);
        });
    }, []);

    return (
        <>
            <Head>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
