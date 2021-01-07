import type firebase from 'firebase/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const AuthUI = dynamic(import('../components/AuthUI'), { ssr: false });

interface Props {
    firebaseApp?: firebase.app.App;
}

const LoginPage: React.VFC<Props> = ({ firebaseApp }) => {
    const router = useRouter();

    useEffect(() => {
        if (!firebaseApp) return;
        // ログイン済みなら /game ページに自動的に遷移する
        firebaseApp.auth().onAuthStateChanged((user) => {
            if (!user) return;
            void router.replace('/game');
        });
    }, [firebaseApp, router]);

    return (
        <>
            <Head>
                <title>ログイン | A/ive</title>
            </Head>
            <h2>ログイン</h2>
            {firebaseApp && <AuthUI firebaseApp={firebaseApp} />}
        </>
    );
};

export default LoginPage;
