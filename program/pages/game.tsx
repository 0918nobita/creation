import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

const Game = dynamic(import('../components/Game'), { ssr: false });

const GamePage: React.VFC = () => {
    return (
        <>
            <Head>
                <title>Game</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Game />
        </>
    );
};

export default GamePage;
