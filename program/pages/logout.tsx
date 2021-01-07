import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Head from 'next/head';

interface Props {
    firebaseApp?: firebase.app.App;
}

const LogoutPage: React.VFC<Props> = ({ firebaseApp }) => {
    const router = useRouter();

    useEffect(() => {
        if (!firebaseApp) return;

        const auth = firebaseApp.auth();
        auth.onAuthStateChanged((user) => {
            if (!user) {
                void router.replace('/');
                return;
            }
            void auth.signOut().then(() => {
                void router.replace('/');
            });
        });
    }, [firebaseApp, router]);

    return (
        <>
            <Head>
                <title>ログアウト | A/ive</title>
            </Head>
        </>
    );
};

export default LogoutPage;
