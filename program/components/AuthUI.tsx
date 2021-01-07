import firebase from 'firebase/app';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// FIXME: Local Emulator Suite を使用している場合にログインに失敗する
interface Props {
    firebaseAuth: firebase.auth.Auth;
}

const uiConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    signInSuccessUrl: '/login',
    credentialHelper: 'none',
};

const AuthUI: React.VFC<Props> = ({ firebaseAuth }) => (
    <StyledFirebaseAuth firebaseAuth={firebaseAuth} uiConfig={uiConfig} />
);

export default AuthUI;
