import { Response } from "../../Models/Response";
import { Robot } from "../../Models/Robot";

export function MoveEast(robot: Robot):Response {
    if (robot.x < 4) {
        robot.x = robot.x + 1;
        return new Response(true, "Success");
    } else {
        return new Response(false, "Cannot move outside the table");
    }
}