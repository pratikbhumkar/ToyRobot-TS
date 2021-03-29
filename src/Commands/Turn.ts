import { Directions } from "../Models/Directions";
import { Robot } from "../Models/Robot";

export function Turn(direction:string, robot: Robot) {
    if (robot.placed) {
        let directions = Object.keys(Directions);
        let currentDirectionIndex = directions.indexOf(robot.direction);
        if (direction === Directions.LEFT) {
            currentDirectionIndex = (currentDirectionIndex + 1) % 4;
        } else {
            currentDirectionIndex = (currentDirectionIndex - 1 + 4) % 4;
        }
        robot.direction = directions[currentDirectionIndex];
        return { Success: true, robot: robot }
    } else {
        return { Success: false, Message: "You need to place before you Turn." }
    }
};