import firebase from 'firebase/app';
import React, { createContext, useEffect, useState } from 'react';

export type State = null | {
    app: firebase.app.App;
    auth: firebase.auth.Auth;
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
        if (process.env.useEmulators) {
            auth.useEmulator('http://localhost:9099');
        }
        const storage = app.storage();
        setState({ app, auth, storage });
    }, [state, setState]);

    return (
        <FirebaseContext.Provider value={state}>
            {children}
        </FirebaseContext.Provider>
    );
};
