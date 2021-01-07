import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';

import styles from './Game.module.css';

const Game: React.VFC = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        PIXI.utils.skipHello();

        const loader = PIXI.Loader.shared;

        const app = new PIXI.Application({
            width: 1280,
            height: 720,
            antialias: true,
            backgroundColor: 0xAAAAAA,
        });
        ref.current!.appendChild(app.view);

        (async () => {
            window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new window.AudioContext();
            const response = await fetch('/se.m4a');
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

            const makeBufferSourceNode = (): AudioBufferSourceNode => {
                const audioBufferSourceNode = ctx.createBufferSource();
                audioBufferSourceNode.buffer = audioBuffer;
                audioBufferSourceNode.connect(ctx.destination);
                return audioBufferSourceNode;
            };

            const setup = () => {
                const sheet = loader.resources['/spritesheet.json'].spritesheet;
                if (!sheet) return;
    
                const guardSprite = new PIXI.Sprite(sheet.textures['guard']);
                guardSprite.scale.x = 0.5;
                guardSprite.scale.y = 0.5;
    
                const starSprite = new PIXI.Sprite(sheet.textures['star']);
                starSprite.scale.x = 0.5;
                starSprite.scale.y = 0.5;
                starSprite.position.x = guardSprite.width + starSprite.width / 2 + 25;
                starSprite.position.y = starSprite.height / 2 + 25;
                starSprite.anchor.x = 0.5;
                starSprite.anchor.y = 0.5;

                starSprite.interactive = true;
                starSprite.on('click', () => {
                    const bufferSource = makeBufferSourceNode();
                    bufferSource.start(ctx.currentTime, 4.8, 2.4);
                });
                starSprite.on('touchstart', () => {
                    const bufferSource = makeBufferSourceNode();
                    bufferSource.start(ctx.currentTime, 4.8, 2.4);
                });
    
                const doorSprite = new PIXI.Sprite(sheet.textures['door']);
                doorSprite.scale.x = 0.5;
                doorSprite.scale.y = 0.5;
                doorSprite.position.y = guardSprite.height + 25;

                doorSprite.interactive = true;
                doorSprite.on('click', () => {
                    const bufferSource = makeBufferSourceNode();
                    bufferSource.start(ctx.currentTime, 7.2, 2.4);
                });
                doorSprite.on('touchstart', () => {
                    const bufferSource = makeBufferSourceNode();
                    bufferSource.start(ctx.currentTime, 7.2, 2.4);
                });
    
                const text = 'Hello, PixiJS!';
                const textObj = new PIXI.Text('', { font: 'bold 60pt Arial', fill: 'black' });
                let isTextCompletelyDisplayed = false;
                textObj.position.x = 380;
                textObj.position.y = 160;
    
                app.stage.addChild(guardSprite);
                app.stage.addChild(starSprite);
                app.stage.addChild(doorSprite);
                app.stage.addChild(textObj);
    
                let elapsedTime = 0;
    
                app.ticker.add((delta) => {
                    elapsedTime += delta;
                    starSprite.rotation += delta / 100;
    
                    if (!isTextCompletelyDisplayed) {
                        const tmp = Math.floor(elapsedTime / 10);
                        if (tmp <= text.length) {
                            textObj.text = text.substring(0, tmp);
                        } else {
                            isTextCompletelyDisplayed = true;
                        }
                    }
                });
            };
    
            loader.add('/spritesheet.json').load(setup);
        })();

        return () => {
            loader.reset();

            for (const textureUrl in PIXI.utils.BaseTextureCache) {
                delete PIXI.utils.BaseTextureCache[textureUrl];
            }

            for (const textureUrl in PIXI.utils.TextureCache) {
                delete PIXI.utils.TextureCache[textureUrl];
            }

            ref.current!.removeChild(app.view);
            app.destroy();
        }
    }, []);

    return (
        <div
            ref={ref}
            className={
                [
                    styles.container,
                    'flex',
                    'justify-center',
                    'items-center',
                    'w-screen',
                    'h-screen',
                    'bg-black',
                ].join(' ')
            }
        />
    );
};

export default Game;
