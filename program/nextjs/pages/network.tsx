import Head from 'next/head';
import React, { useEffect, useState } from 'react';

type NetworkStatus = 'online' | 'offline' | null;

const NetworkPage: React.VFC = () => {
    const [status, setStatus] = useState<NetworkStatus>(null);

    useEffect(() => {
        setStatus(navigator.onLine ? 'online' : 'offline');

        const onlineEventHandler = () => {
            setStatus('online');
        };
        const offlineEventHandler = () => {
            setStatus('offline');
        };
        window.addEventListener('online', onlineEventHandler);
        window.addEventListener('offline', offlineEventHandler);

        return () => {
            window.removeEventListener('online', onlineEventHandler);
            window.removeEventListener('offline', offlineEventHandler);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Network</title>
            </Head>
            <div>Status: {status}</div>
        </>
    );
};

export default NetworkPage;
