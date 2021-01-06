import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';

const Game: React.VFC = () => {
    const ref = useRef<HTMLDivElement>(null);

    const requestRef = useRef<number>();

    useEffect(() => {
        PIXI.utils.skipHello();

        const renderer = PIXI.autoDetectRenderer({
            width: 600,
            height: 500,
            antialias: true,
            backgroundColor: 0xAAAAAA,
        });
        ref.current!.appendChild(renderer.view);

        const stage = new PIXI.Container();

        PIXI.Loader.shared.add('/spritesheet.json').load(() => {
            const sheet = PIXI.Loader.shared.resources['/spritesheet.json'].spritesheet;
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

            const doorSprite = new PIXI.Sprite(sheet.textures['door']);
            doorSprite.scale.x = 0.5;
            doorSprite.scale.y = 0.5;
            doorSprite.position.y = guardSprite.height + 25;

            /*
            const graphics = new PIXI.Graphics();
            graphics.beginFill(0x00FF00);
            graphics.drawRect(0, 0, guardSprite.width, guardSprite.height);
            stage.addChild(graphics);
            */

            stage.addChild(guardSprite);
            stage.addChild(starSprite);
            stage.addChild(doorSprite);

            const animate = () => {
                starSprite.rotation += 0.01;
                renderer.render(stage);
                requestRef.current = requestAnimationFrame(animate);
            };

            animate();
        });

        return () => {
            cancelAnimationFrame(requestRef.current!);
        };
    }, []);

    return <div ref={ref} />;
};

export default Game;
