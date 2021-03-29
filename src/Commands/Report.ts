import { Robot } from "../Models/Robot";
export function Report(robot: Robot) {
    if (robot.placed) {
        console.log(`Output: ${robot.x},${robot.y},${robot.direction}`)
        return `Output: ${robot.x},${robot.y},${robot.direction}`;
    } else {
        return { Success: false, Message: "You need to place before you Report." }
    }
};