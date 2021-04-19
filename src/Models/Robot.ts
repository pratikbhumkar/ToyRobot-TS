export class Robot {
    x: number;
    y: number;
    direction: string;
    placed: boolean;
    size: number;

    constructor(size: number) {
        this.x = 0;
        this.y = 0;
        this.placed = false;
        this.size = size;
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
    getDirection(): string {
        return this.direction;
    }
    setDirection(direction: string): void {
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