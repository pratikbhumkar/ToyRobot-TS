import { Robot } from "../../Models/Robot";
import { Response } from "../../Models/Response";

export function MoveNorth(robot: Robot):Response {
    if (robot.y < 4) {
        robot.y = robot.y + 1;
        return new Response(true, "Success");
    } else {
        return new Response(false, "Cannot move outside the table");
    }
}