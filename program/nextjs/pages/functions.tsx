import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../contexts/FirebaseContext';

const FunctionsPage: React.VFC = () => {
    const firebaseState = useContext(FirebaseContext);

    const [content, setContent] = useState('');

    useEffect(() => {
        if (!firebaseState) return;
        const { functions } = firebaseState;
        void functions
            .httpsCallable('example')()
            .then((res) => {
                console.log({ res });
                setContent((res.data as { message: string }).message);
            });
    }, [firebaseState]);

    return (
        <>
            <Head>
                <title>Functions</title>
            </Head>
            <div>{content}</div>
        </>
    );
};

export default FunctionsPage;
