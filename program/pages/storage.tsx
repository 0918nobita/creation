import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../contexts/FirebaseContext';

const StoragePage: React.VFC = () => {
    const router = useRouter();

    const [src, setSrc] = useState<string | null>(null);

    const firebaseState = useContext(FirebaseContext);

    useEffect(() => {
        if (!firebaseState) return;
        const { auth, storage } = firebaseState;
        auth.onAuthStateChanged((user) => {
            if (!user) {
                void router.replace('/login');
                return;
            }
            void (async () => {
                const res = await storage
                    .ref()
                    .child('users')
                    .child(user.uid)
                    .listAll();
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const url: string = await res.items[0].getDownloadURL();
                setSrc(url);
            })();
        });
    }, [firebaseState, router]);

    return (
        <>
            <Head>
                <title>Storage</title>
            </Head>
            {src && <img src={src} alt="取得した画像" />}
        </>
    );
};

export default StoragePage;
