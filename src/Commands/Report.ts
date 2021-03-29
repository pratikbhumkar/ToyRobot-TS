import { Robot } from "../Models/Robot";
import { Response } from "../Models/Response";

export function Report(robot: Robot): Response {
    if (robot.placed) {
        console.log(`Output: ${robot.x},${robot.y},${robot.direction}`)
        return new Response(true, `Output: ${robot.x},${robot.y},${robot.direction}`)
    } else {
        return new Response(false, "You need to place before you Report.")
    }
};