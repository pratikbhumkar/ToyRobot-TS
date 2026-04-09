import { Move } from "../../Commands/Move/Move";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe("Move", () => {
    test("returns failure when the robot has not been placed", () => {
        const robot = new Robot(5);
        const response: Response = Move(robot);
        expect(response.Success).toBeFalsy();
        expect(response.Message).toEqual("You need to place before you Move.");
    });
    test("moves one step according to facing when the robot is placed", () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setDirection(Directions.NORTH);
        robot.setX(0);
        robot.setY(0);
        const response: Response = Move(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getY()).toEqual(1);
        expect(robot.getX()).toEqual(0);
    });
});
