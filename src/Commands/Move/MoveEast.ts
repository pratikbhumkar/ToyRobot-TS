import { Response } from "../../Models/Response";
import { Robot } from "../../Models/Robot";

export function MoveEast(robot: Robot): Response {
    if (robot.getX() < robot.getSize() - 1) {
        robot.setX(robot.getX() + 1)
        return new Response(true, "Success");
    } else {
        return new Response(false, "Cannot move outside the table");
    }
}