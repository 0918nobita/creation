import type firebase from 'firebase/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const AuthUI = dynamic(import('../components/AuthUI'), { ssr: false });

interface Props {
    firebaseApp?: firebase.app.App;
}

const LoginPage: React.VFC<Props> = ({ firebaseApp }) => (
    <>
        <Head>
            <title>ログイン | A/ive</title>
        </Head>
        <h2>ログイン</h2>
        {firebaseApp && <AuthUI firebaseApp={firebaseApp} />}
    </>
);

export default LoginPage;
