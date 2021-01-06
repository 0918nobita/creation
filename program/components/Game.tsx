import * as PIXI from 'pixi.js';
import { useEffect, useRef } from 'react';

const Game: React.VFC = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        PIXI.utils.skipHello();

        const app = new PIXI.Application({
            width: 600,
            height: 500,
            antialias: true,
            backgroundColor: 0xAAAAAA,
        });
        ref.current!.appendChild(app.view);

        const loader = PIXI.Loader.shared;

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

            const doorSprite = new PIXI.Sprite(sheet.textures['door']);
            doorSprite.scale.x = 0.5;
            doorSprite.scale.y = 0.5;
            doorSprite.position.y = guardSprite.height + 25;

            /*
            const graphics = new PIXI.Graphics();
            graphics.beginFill(0x00FF00);
            graphics.drawRect(0, 0, guardSprite.width, guardSprite.height);
            app.stage.addChild(graphics);
            */

            app.stage.addChild(guardSprite);
            app.stage.addChild(starSprite);
            app.stage.addChild(doorSprite);

            app.ticker.add((delta) => {
                starSprite.rotation += delta / 100;
            });
        };

        loader.add('/spritesheet.json').load(setup);
    }, []);

    return <div ref={ref} />;
};

export default Game;
