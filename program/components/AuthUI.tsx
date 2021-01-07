import firebase from 'firebase/app';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

interface Props {
    firebaseApp: firebase.app.App;
}

const uiConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    signInSuccessUrl: '/login',
    credentialHelper: 'none',
};

const AuthUI: React.VFC<Props> = ({ firebaseApp }) => (
    <StyledFirebaseAuth firebaseAuth={firebaseApp.auth()} uiConfig={uiConfig} />
);

export default AuthUI;
