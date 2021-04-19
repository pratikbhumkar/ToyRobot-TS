import { Robot } from "../../Models/Robot";
import { Response } from "../../Models/Response";
import { IMove } from "./Move";

export class MoveNorth implements IMove {
    move(robot: Robot):Response{
        var y:number= robot.getY()
            if (y < (robot.getSize() - 1)) {
                robot.setY(y + 1);
                return new Response(true, "Success");
            } else {
                return new Response(false, "Cannot move outside the table");
            }
    }
}