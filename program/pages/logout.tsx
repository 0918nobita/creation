import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
                router.replace('/');
                return;
            }
            auth.signOut().then(() => {
                router.replace('/');
            });
        });
    }, [firebaseApp]);

    return (
        <>
            <Head>
                <title>ログアウト | A/ive</title>
            </Head>
        </>
    );
};

export default LogoutPage;
