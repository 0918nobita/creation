import express from 'express';
import next from 'next';
import 'isomorphic-fetch';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { PORT } = process.env;
const port = PORT ? parseInt(PORT) : 3000;

async function main() {
    try {
        const server = express();

        server.get('/ping', (_, res, next) => {
            void fetch('https://api.alive.kodai.vision')
                .then(() => {
                    res.send('pong');
                })
                .catch((err) => next(err));
        });

        await app.prepare();

        server.all('*', (req, res) => {
            void handle(req, res);
        });

        server.listen(port, (err?: unknown) => {
            if (err) throw err;
            console.log(
                `> Ready on localhost:${port} - env ${
                    dev ? 'development' : 'production'
                }`
            );
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

void main();
