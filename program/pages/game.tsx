import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';

const Game = dynamic(import('../components/Game'), { ssr: false });

const GamePage: React.VFC = () => {
    return (
        <>
            <Head>
                <title>Game</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Game />
            <p>
                <Link href="/">
                    <a>Go home</a>
                </Link>
            </p>
        </>
    );
};

export default GamePage;
