import { MoveSouth } from "../../Commands/Move/MoveSouth";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe('Unit Testing for MoveSouth command', () => {
    test('Test if the MoveSouth command works as expected for a Placed robot', () => {
        let robot = new Robot(5);
        robot.placed = true;
        robot.x = 0;
        robot.y = 1;
        robot.direction = Directions.SOUTH;
        let response: Response = MoveSouth(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.x).toEqual(0);
        expect(robot.y).toEqual(0);
    });
    test('Test if the MoveSouth command works as expected for a Placed robot and prevents falling down', () => {
        let robot = new Robot(5);
        robot.placed = true;
        robot.x = 0;
        robot.y = 0;
        robot.direction = Directions.SOUTH;
        let response: Response = MoveSouth(robot);
        expect(response.Success).toBeFalsy();
    });
})