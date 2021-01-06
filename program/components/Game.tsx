import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';

const Game: React.VFC = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const app = new PIXI.Application({ width: 600, height: 600 });
        ref.current!.appendChild(app.view);
    }, []);

    return <div ref={ref} />;
};

export default Game;
