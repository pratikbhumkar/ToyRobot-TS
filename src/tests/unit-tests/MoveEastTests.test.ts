import { MoveEast } from "../../Commands/Move/MoveEast";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe('Unit Testing for MoveEast command', () => {
    test('Test if the MoveEast command works as expected for a Placed robot', () => {
        let robot = new Robot(5);
        robot.placed = true;
        robot.x = 0;
        robot.y = 0;
        robot.direction = Directions.EAST;
        let response: Response = MoveEast(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.x).toEqual(1);
        expect(robot.y).toEqual(0);
    });
    test('Test if the MoveEast command works as expected for a Placed robot and prevents falling down', () => {
        let robot = new Robot(5);
        robot.placed = true;
        robot.x = 4;
        robot.y = 4;
        robot.direction = Directions.EAST;
        let response: Response = MoveEast(robot);
        expect(response.Success).toBeFalsy();
    });
})