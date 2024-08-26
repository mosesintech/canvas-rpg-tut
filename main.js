import { resources } from './src/Resource';
import { Sprite } from './src/Sprite';
import { Vector2 } from './src/Vector2';
import './style.css'

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
});

const groundSprite = new Sprite({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
});

const heroSprite = new Sprite({
    resource: resources.images.hero,
    frameSize: new Vector2(32, 32),
    hFrames: 3,
    vFrames: 8,
    frame: 1,
})

const shadowSprite = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32, 32)
});

const heroPosition = new Vector2(16 * 6, 16 * 5);

const draw = () => {
    skySprite.drawImage(ctx, 0, 0); 
    groundSprite.drawImage(ctx, 0, 0); 

    const heroOffset = new Vector2(-8, -21);
    const heroPosX = heroPosition.x + heroOffset.x;
    const heroPosY = heroPosition.y + heroOffset.y

    shadowSprite.drawImage(ctx, heroPosX, heroPosY);
    heroSprite.drawImage(ctx, heroPosX, heroPosY);
}

setInterval(() => {
    draw();
}, 300);