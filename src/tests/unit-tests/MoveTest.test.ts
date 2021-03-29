import { Move } from "../../Commands/Move/Move";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe('Unit Testing for Move command', () => {
    test('Test if the Move command throws error for an un-Placed robot', () => {
        let robot = new Robot(5);
        let response: Response = Move(robot);
        expect(response.Success).toBeFalsy();
        expect(response.Message).toEqual("You need to place before you Move.");
    })
    test('Test if the Move command works as expected for a Placed robot', () => {
        let robot = new Robot(5);
        robot.placed = true;
        robot.direction = Directions.NORTH;
        robot.x = 0;
        robot.y = 0;
        let response: Response = Move(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.y).toEqual(1);
        expect(robot.x).toEqual(0);
    })
})