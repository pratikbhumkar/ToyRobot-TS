import { Robot } from "../../Models/Robot";
import { Response } from "../../Models/Response";

export function MoveSouth(robot: Robot):Response {
    var y:number=robot.getY();
    if (y > 0) {
        robot.setY(y-1);
        return new Response(true, "Success");
    } else {
        return new Response(false, "Cannot move outside the table");
    }
}