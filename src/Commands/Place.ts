import { Robot } from "../Models/Robot";
import { Response } from "../Models/Response";

export function Place(x: number, y: number, direction: string, robot: Robot): Response {
    if (x < robot.size && x > -1 && y < robot.size && y > -1) {
        robot.x = x;
        robot.y = y;
        robot.direction = direction;
        robot.placed = true
        return new Response(true, "")
    } else {
        return new Response(false, "Cannot place outside the table")
    }
};