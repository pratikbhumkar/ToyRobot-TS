import { Directions } from "./Directions";

export class Robot{
    x: number;
    y: number;
    direction: string;
    placed: boolean;

    constructor(){
        this.x = 0;
        this.y = 0;
        this.direction = Directions.NORTH;
        this.placed = false;
    }
}