import { MoveWest } from "../../Commands/Move/MoveWest";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe('Unit Testing for MoveWest command', () => {
    test('Test if the MoveWest command works as expected for a Placed robot', () => {
        let robot = new Robot(5);
        robot.placed = true;
        robot.x = 1;
        robot.y = 0;
        robot.direction = Directions.WEST;
        let response: Response = MoveWest(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.x).toEqual(0);
        expect(robot.y).toEqual(0);
    });
    test('Test if the MoveWest command works as expected for a Placed robot and prevents falling down', () => {
        let robot = new Robot(5);
        robot.placed = true;
        robot.x = 0;
        robot.y = 0;
        robot.direction = Directions.WEST;
        let response: Response = MoveWest(robot);
        expect(response.Success).toBeFalsy();
    });
})