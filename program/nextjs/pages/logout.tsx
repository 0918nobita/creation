import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import Head from 'next/head';

import { FirebaseContext } from '../contexts/FirebaseContext';

const LogoutPage: React.VFC = () => {
    const firebaseState = useContext(FirebaseContext);

    const router = useRouter();

    useEffect(() => {
        if (!firebaseState) return;

        const { auth } = firebaseState;
        auth.onAuthStateChanged((user) => {
            if (!user) {
                void router.replace('/');
                return;
            }
            void auth.signOut().then(() => {
                void router.replace('/');
            });
        });
    }, [firebaseState, router]);

    return (
        <>
            <Head>
                <title>ログアウト | A/ive</title>
            </Head>
        </>
    );
};

export default LogoutPage;
