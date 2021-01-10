import firebase from 'firebase/app';
import React, { createContext, useEffect, useState } from 'react';

export type State = null | {
    app: firebase.app.App;
    auth: firebase.auth.Auth;
    functions: firebase.functions.Functions;
};

export const FirebaseContext = createContext<State>(null);

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
};

export const FirebaseContextProvider: React.FC = ({ children }) => {
    const [state, setState] = useState<State>(null);

    useEffect(() => {
        if (state !== null) return;
        const app = firebase.initializeApp(firebaseConfig);
        const auth = app.auth();
        const functions = app.functions('asia-northeast1');

        if (process.env.useEmulators) {
            auth.useEmulator('http://localhost:9099');
            functions.useEmulator('localhost', 5001);
        }

        setState({ app, auth, functions });
    }, [state, setState]);

    return (
        <FirebaseContext.Provider value={state}>
            {children}
        </FirebaseContext.Provider>
    );
};
