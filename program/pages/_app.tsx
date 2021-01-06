import type { AppProps } from 'next/app';
import { useEffect } from 'react';

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
    useEffect(() => {
        if (!('serviceWorker' in navigator)) return;
        navigator.serviceWorker.register('/sw.js').then((regisration) => {
            console.log('Service Worker regisration successful with scope: ', regisration.scope);
        });
    }, []);

    return <Component {...pageProps} />
};

export default MyApp;
