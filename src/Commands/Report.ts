import { Robot } from "../Models/Robot";
import { Response } from "../Models/Response";

export function Report(robot: Robot): Response {
    if (robot.getPlaced()) {
        console.log(`Output: ${robot.getX()},${robot.getY()},${robot.getDirection()}`)
        return new Response(true, `Output: ${robot.getX()},${robot.getY()},${robot.getDirection()}`)
    } else {
        return new Response(false, "You need to place before you Report.")
    }
};