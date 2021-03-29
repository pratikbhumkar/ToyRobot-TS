import { MoveNorth } from "../../Commands/Move/MoveNorth";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe('Unit Testing for MoveNorth command', () => {
    test('Test if the MoveNorth command works as expected for a Placed robot', () => {
        let robot = new Robot(5);
        robot.placed = true;
        robot.x = 0;
        robot.y = 0;
        robot.direction = Directions.EAST;
        let response: Response = MoveNorth(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.x).toEqual(0);
        expect(robot.y).toEqual(1);
    });
    test('Test if the MoveNorth command works as expected for a Placed robot and prevents falling down', () => {
        let robot = new Robot(5);
        robot.placed = true;
        robot.x = 4;
        robot.y = 4;
        robot.direction = Directions.EAST;
        let response: Response = MoveNorth(robot);
        expect(response.Success).toBeFalsy();
    });
})