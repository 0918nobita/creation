import firebase from 'firebase/app';
import React, { useCallback, useRef, useState } from 'react';

interface Props {
    firebaseAuth: firebase.auth.Auth;
}

const AuthUI: React.VFC<Props> = ({ firebaseAuth }) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [failed, setFailed] = useState(false);

    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (!emailRef.current || !passwordRef.current) return;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            firebaseAuth
                .signInWithEmailAndPassword(email, password)
                .catch(() => {
                    setFailed(true);
                });
        },
        [firebaseAuth]
    );

    return (
        <form
            onSubmit={onSubmit}
            className="flex flex-col m-4 p-4 space-y-4 w-min bg-blue-50"
        >
            {failed && (
                <span className="text-red-600">
                    メールアドレスまたはパスワードが間違っています
                </span>
            )}
            <label>
                メールアドレス：
                <input
                    ref={emailRef}
                    type="email"
                    required
                    placeholder="メールアドレス"
                    className="p-2 border rounded focus:outline-none focus:border-blue-400 focus:ring"
                />
            </label>
            <label>
                パスワード：
                <input
                    ref={passwordRef}
                    type="password"
                    required
                    placeholder="パスワード"
                    className="p-2 border rounded focus:outline-none focus:border-blue-400 focus:ring"
                />
            </label>
            <input
                type="submit"
                value="ログイン"
                className="place-self-center w-min p-2 border rounded bg-blue-400 text-white focus:outline-none focus:border-blue-400 focus:ring"
            />
        </form>
    );
};

export default AuthUI;
