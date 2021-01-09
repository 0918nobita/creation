import firebase from 'firebase/app';
import React, { createContext, useEffect, useState } from 'react';

export type State = null | {
    app: firebase.app.App;
    auth: firebase.auth.Auth;
    firestore: firebase.firestore.Firestore;
    functions: firebase.functions.Functions;
    storage: firebase.storage.Storage;
};

export const FirebaseContext = createContext<State>(null);

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
};

export const FirebaseContextProvider: React.FC = ({ children }) => {
    const [state, setState] = useState<State>(null);

    useEffect(() => {
        if (state !== null) return;
        const app = firebase.initializeApp(firebaseConfig);
        const auth = app.auth();
        const functions = app.functions('asia-northeast1');
        const firestore = app.firestore();

        if (process.env.useEmulators) {
            auth.useEmulator('http://localhost:9099');
            functions.useEmulator('localhost', 5001);
            firestore.useEmulator('localhost', 8080);
        }

        firestore.enablePersistence().catch((err: { code: string }) => {
            switch (err.code) {
                case 'failed-precondition':
                    console.info(
                        'すでに別のタブでオフラインキャッシュの設定が行われています'
                    );
                    break;
                case 'unimplemented':
                    console.warn(
                        'この端末はセーブデータのオフラインキャッシュに対応していません'
                    );
                    break;
                default:
                    console.error(
                        'オフラインキャッシュを設定する際に予期しないエラーが発生しました',
                        err
                    );
            }
        });

        const storage = app.storage();
        setState({ app, auth, firestore, functions, storage });
    }, [state, setState]);

    return (
        <FirebaseContext.Provider value={state}>
            {children}
        </FirebaseContext.Provider>
    );
};
