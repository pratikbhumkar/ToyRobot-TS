import { MoveSouth } from "../../Commands/Move/MoveSouth";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe('Unit Testing for MoveSouth command', () => {
    test('Test if the MoveSouth command works as expected for a Placed robot', () => {
        let robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(1);
        robot.setDirection(Directions.SOUTH);
        let response: Response = MoveSouth(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getX()).toEqual(0);
        expect(robot.getY()).toEqual(0);
    });
    test('Test if the MoveSouth command works as expected for a Placed robot and prevents falling down', () => {
        let robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.SOUTH);
        let response: Response = MoveSouth(robot);
        expect(response.Success).toBeFalsy();
    });
})