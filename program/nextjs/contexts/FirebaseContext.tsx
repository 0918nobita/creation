import firebase from 'firebase/app';
import React, { createContext, useEffect, useState } from 'react';

export type State = null | {
    app: firebase.app.App;
    auth: firebase.auth.Auth;
    functions: firebase.functions.Functions;
    database: firebase.database.Database;
};

export const FirebaseContext = createContext<State>(null);

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
};

export const FirebaseContextProvider: React.FC = ({ children }) => {
    const [state, setState] = useState<State>(null);

    useEffect(() => {
        if (state !== null) return;
        const app = firebase.initializeApp(firebaseConfig);
        const auth = app.auth();
        const functions = app.functions('asia-northeast1');
        const database = app.database();

        if (process.env.useEmulators) {
            auth.useEmulator('http://localhost:9099');
            functions.useEmulator('localhost', 5001);
            database.useEmulator('localhost', 9000);
        }

        setState({ app, auth, functions, database });
    }, [state, setState]);

    return (
        <FirebaseContext.Provider value={state}>
            {children}
        </FirebaseContext.Provider>
    );
};
