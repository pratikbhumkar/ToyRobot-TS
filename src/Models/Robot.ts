import { Directions } from "./Directions";

export type RobotState = Readonly<{
    x: number;
    y: number;
    direction: Directions;
    placed: boolean;
    size: number;
}>;

export class Robot {
    x: number;
    y: number;
    direction: Directions;
    placed: boolean;
    size: number;

    constructor(size: number) {
        this.x = 0;
        this.y = 0;
        this.placed = false;
        this.size = size;
        this.direction = Directions.NORTH;
    }

    static create(size: number): Robot {
        return new Robot(size);
    }

    static fromState(state: RobotState): Robot {
        const robot = new Robot(state.size);
        robot.applyState(state);
        return robot;
    }

    toState(): RobotState {
        return {
            x: this.x,
            y: this.y,
            direction: this.direction,
            placed: this.placed,
            size: this.size
        };
    }

    applyState(state: RobotState): void {
        this.x = state.x;
        this.y = state.y;
        this.direction = state.direction;
        this.placed = state.placed;
        this.size = state.size;
    }

    getX(): number {
        return this.x;
    }
    setX(x: number): void {
        this.x = x;
    }
    getY(): number {
        return this.y;
    }
    setY(y: number): void {
        this.y = y;
    }
    getDirection(): Directions {
        return this.direction;
    }
    setDirection(direction: Directions): void {
        this.direction = direction;
    }
    getPlaced(): boolean {
        return this.placed;
    }
    setPlaced(placed: boolean): void {
        this.placed = placed;
    }
    getSize(): number {
        return this.size;
    }
    setSize(size: number): void {
        this.size = size;
    }
}