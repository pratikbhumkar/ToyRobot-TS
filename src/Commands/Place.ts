import { Robot } from "../Models/Robot";
export function Place(x:number, y:number, direction:string, robot:Robot) {
    x = Number(x)
    y = Number(y)
    if (x < 5 && x > -1 && y < 5 && y > -1) {
        robot.x = x;
        robot.y = y;
        robot.direction = direction;
        if (!robot.placed) {
            robot.placed = true
            return { Success: true, robot: robot };
        }
    } else {
        return { Success: false, Message: "Cannot place outside the table" }
    }
};