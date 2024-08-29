import { DOWN, LEFT, RIGHT, UP } from './src/constants';
import { GameLoop } from './src/GameLoop';
import { gridCells } from './src/helpers/grid';
import { moveTowards } from './src/helpers/moveTowards';
import { Input } from './src/Input';
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
    position: new Vector2(gridCells(6), gridCells(5)),
})

const heroDestinationPosition = heroSprite.position.duplicate();

const shadowSprite = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32, 32)
});

const input = new Input();

const update = () => {
    // updating entities in the game;

    const distance = moveTowards(heroSprite, heroDestinationPosition, 1);
    const hasArrived = distance <= 1;
    if(hasArrived) tryMove();
}

const tryMove = () => {
    if(!input.direction) return;

    let nextX = heroDestinationPosition.x;
    let nextY = heroDestinationPosition.y;
    const gridSize = 16;


    switch (input.direction) {
        case UP:
            nextY -= gridSize;
            heroSprite.frame = 6;
            break;
        case DOWN:
            nextY += gridSize;
            heroSprite.frame = 0;
            break;
        case LEFT:
            nextX -= gridSize;
            heroSprite.frame = 9;
            break;
        case RIGHT:
            nextX += gridSize;
            heroSprite.frame = 3;
            break;    
        default:
            break;
    }

    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;
}

const draw = () => {
    skySprite.drawImage(ctx, 0, 0); 
    groundSprite.drawImage(ctx, 0, 0); 

    const heroOffset = new Vector2(-8, -21);
    const heroPosX = heroSprite.position.x + heroOffset.x;
    const heroPosY = heroSprite.position.y + heroOffset.y

    shadowSprite.drawImage(ctx, heroPosX, heroPosY);
    heroSprite.drawImage(ctx, heroPosX, heroPosY);
}


const gameLoop = new GameLoop(update, draw);
gameLoop.start();