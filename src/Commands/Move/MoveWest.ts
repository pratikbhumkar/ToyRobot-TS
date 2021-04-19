import { Robot } from "../../Models/Robot";
import { Response } from "../../Models/Response";
import { IMove } from "./Move";

export class MoveWest implements IMove {
    move(robot: Robot): Response {
        var x: number = robot.getX();
        if (x > 0) {
            robot.setX(x - 1)
            return new Response(true, "Success");
        } else {
            return new Response(false, "Cannot move outside the table");
        }
    }
}