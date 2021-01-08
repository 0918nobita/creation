import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../contexts/FirebaseContext';

const AuthUI = dynamic(import('../components/AuthUI'), { ssr: false });

const LoginPage: React.VFC = () => {
    const firebaseState = useContext(FirebaseContext);

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!firebaseState) return;

        // ログイン済みなら /game ページに自動的に遷移する
        firebaseState.auth.onAuthStateChanged((user) => {
            if (!user) {
                setLoading(false);
                return;
            }
            void router.replace('/game');
        });
    }, [firebaseState, router]);

    return (
        <>
            <Head>
                <title>ログイン | A/ive</title>
            </Head>
            <h2>ログイン</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                firebaseState && <AuthUI firebaseAuth={firebaseState.auth} />
            )}
        </>
    );
};

export default LoginPage;
