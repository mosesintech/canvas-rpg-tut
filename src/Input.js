import { DOWN, LEFT, RIGHT, UP } from "./constants";

export class Input {
    constructor() {
        this.heldDirections = [];
        
        document.addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowUp":
                case "KeyW":
                    this.onArrowPressed(UP);
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.onArrowPressed(DOWN);
                    break;
                case "ArrowLeft":
                case "KeyA":
                    this.onArrowPressed(LEFT);
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.onArrowPressed(RIGHT);
                    break;
                default:
                    break;
            }
        })

        document.addEventListener("keyup", (e) => {
            switch (e.code) {
                case "ArrowUp":
                case "KeyW":
                    this.onArrowReleased(UP);
                    break;
                case "ArrowDown":
                case "KeyS":
                    this.onArrowReleased(DOWN);
                    break;
                case "ArrowLeft":
                case "KeyA":
                    this.onArrowReleased(LEFT);
                    break;
                case "ArrowRight":
                case "KeyD":
                    this.onArrowReleased(RIGHT);
                    break;
                default:
                    break;
            }
        })
    }

    get direction() {
        return this.heldDirections[0];
    }

    onArrowPressed(direction) {
        // add this arrow to the queue if new
        if(this.heldDirections.indexOf(direction) === -1) {
            this.heldDirections.unshift(direction);
        }
    }

    onArrowReleased(direction) {
        const index = this.heldDirections.indexOf(direction);
        if(index === -1) return;

        // Remove key from list
        this.heldDirections.splice(index, 1);
    }
}