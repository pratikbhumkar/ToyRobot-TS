import { Move } from "../../Commands/Move/Move";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe('Unit Testing for Move command', () => {
    test('Test if the Move command throws error for an un-Placed robot', () => {
        const robot = new Robot(5);
        const response: Response = Move(robot);
        expect(response.Success).toBeFalsy();
        expect(response.Message).toEqual("You need to place before you Move.");
    })
    test('Test if the Move command works as expected for a Placed robot', () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setDirection(Directions.NORTH);
        robot.setX(0);
        robot.setY(0);
        const response: Response = Move(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getY()).toEqual(1);
        expect(robot.getX()).toEqual(0);
    })
})