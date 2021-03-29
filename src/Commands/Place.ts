import { Robot } from "../Models/Robot";
import { Response } from "../Models/Response";

export function Place(x:number, y:number, direction:string, robot:Robot): Response {
    x = Number(x)
    y = Number(y)
    if (x < 5 && x > -1 && y < 5 && y > -1) {
        robot.x = x;
        robot.y = y;
        robot.direction = direction;
        if (!robot.placed) {
            robot.placed = true
            return new Response(true, "")
        }
    } else {
        return new Response(false, "Cannot place outside the table")
    }
};