import { Directions } from "../Models/Directions";
import { Robot } from "../Models/Robot";
import { Response } from "../Models/Response";

export function Turn(direction:string, robot: Robot): Response {
    if (robot.placed) {
        let directions = Object.keys(Directions);
        let currentDirectionIndex = directions.indexOf(robot.direction);
        let sizeLimit = (robot.size - 1)
        if (direction === Directions.LEFT) {
            currentDirectionIndex = (currentDirectionIndex + 1) % sizeLimit;
        } else {
            currentDirectionIndex = (currentDirectionIndex - 1 + sizeLimit) % sizeLimit;
        }
        robot.direction = directions[currentDirectionIndex];
        return new Response(true, "")
    } else {
        return new Response(false, "You need to place before you Turn.")
    }
};