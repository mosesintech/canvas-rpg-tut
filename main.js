import { Animations } from './src/Animations';
import { DOWN, LEFT, RIGHT, UP } from './src/constants';
import { FrameIndexPattern } from './src/FrameIndexPattern';
import { GameLoop } from './src/GameLoop';
import { gridCells, isSpaceFree } from './src/helpers/grid';
import { moveTowards } from './src/helpers/moveTowards';
import { Input } from './src/Input';
import { walls } from './src/levels/level1';
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from './src/objects/Hero/heroAnimations';
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
    animations: new Animations({
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
    })
})

const heroDestinationPosition = heroSprite.position.duplicate();
let heroFacing = DOWN;

const shadowSprite = new Sprite({
    resource: resources.images.shadow,
    frameSize: new Vector2(32, 32)
});

const input = new Input();

const update = (delta) => {
    // updating entities in the game;

    const distance = moveTowards(heroSprite, heroDestinationPosition, 1);
    const hasArrived = distance <= 1;
    if(hasArrived) tryMove();

    // hero animations
    heroSprite.step(delta);
}

const tryMove = () => {
    if(!input.direction) {
        switch (heroFacing) {
            case DOWN:
               heroSprite.animations.play("standDown"); 
                break;
            case UP:
               heroSprite.animations.play("standUp"); 
                break;
            case LEFT:
               heroSprite.animations.play("standLeft"); 
                break;
            case RIGHT:
               heroSprite.animations.play("standRight"); 
                break;
            default:
                break;
        }
        return;
    };

    let nextX = heroDestinationPosition.x;
    let nextY = heroDestinationPosition.y;
    const gridSize = 16;


    switch (input.direction) {
        case UP:
            nextY -= gridSize;
            heroSprite.animations.play("walkUp");
            break;
        case DOWN:
            nextY += gridSize;
            heroSprite.animations.play("walkDown");
            break;
        case LEFT:
            nextX -= gridSize;
            heroSprite.animations.play("walkLeft");
            break;
        case RIGHT:
            nextX += gridSize;
            heroSprite.animations.play("walkRight");
            break;    
        default:
            break;
    }

    heroFacing = input.direction ?? heroFacing;

    if(isSpaceFree(walls, nextX, nextY)) {
        heroDestinationPosition.x = nextX;
        heroDestinationPosition.y = nextY;
    }
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