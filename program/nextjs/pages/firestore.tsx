import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../contexts/FirebaseContext';

const FirestorePage: React.FC = () => {
    const router = useRouter();

    const firebaseState = useContext(FirebaseContext);

    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        if (!firebaseState) return;
        const { auth, firestore } = firebaseState;
        auth.onAuthStateChanged((user) => {
            if (!user) {
                void router.replace('/login');
                return;
            }
            void (async () => {
                const res = await firestore
                    .collection('version')
                    .doc('1')
                    .collection('user')
                    .doc(user.uid)
                    .get();
                setName((res.data() as { name: string }).name);
            })();
        });
    }, [firebaseState, router]);

    return (
        <>
            <Head>
                <title>Firestore</title>
            </Head>
            {name ? <div>name: {name}</div> : <div>Loading...</div>}
        </>
    );
};

export default FirestorePage;
