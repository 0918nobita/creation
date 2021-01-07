import type firebase from 'firebase/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const AuthUI = dynamic(import('../components/AuthUI'), { ssr: false });

interface Props {
    firebaseAuth?: firebase.auth.Auth;
}

const LoginPage: React.VFC<Props> = ({ firebaseAuth }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!firebaseAuth) return;

        setLoading(false);

        // ログイン済みなら /game ページに自動的に遷移する
        firebaseAuth.onAuthStateChanged((user) => {
            if (!user) return;
            void router.replace('/game');
        });
    }, [firebaseAuth, router]);

    return (
        <>
            <Head>
                <title>ログイン | A/ive</title>
            </Head>
            <h2>ログイン</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                firebaseAuth && <AuthUI firebaseAuth={firebaseAuth} />
            )}
        </>
    );
};

export default LoginPage;
