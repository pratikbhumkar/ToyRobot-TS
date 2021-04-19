import { Robot } from "../Models/Robot";
import { Response } from "../Models/Response";

export function Place(x: number, y: number, direction: string, robot: Robot): Response {
    var size:number = robot.getSize()
    if (x < size && x > -1 && y < size && y > -1) {
        robot.setPlaced(true);
        robot.setX(x);
        robot.setY(y);
        robot.setDirection(direction);
        return new Response(true, "")
    } else {
        return new Response(false, "Cannot place outside the table")
    }
};