import localforage from 'localforage';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const DatabasePage: React.VFC = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        void (async () => {
            await localforage.setDriver([
                localforage.INDEXEDDB,
                localforage.LOCALSTORAGE,
                localforage.WEBSQL,
            ]);
            await localforage.ready();
            await localforage.setItem('foo', 'bar');
            const res = await localforage.getItem<string>('foo');
            if (!res) return;
            setContent(res);
        })();
    }, []);

    return (
        <>
            <Head>
                <title>Database</title>
            </Head>
            <div>{content}</div>
        </>
    );
};

export default DatabasePage;
