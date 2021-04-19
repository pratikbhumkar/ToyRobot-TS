import { MoveEast } from "../../Commands/Move/MoveEast";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe('Unit Testing for MoveEast command', () => {
    test('Test if the MoveEast command works as expected for a Placed robot', () => {
        let robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.EAST);
        let response: Response = MoveEast(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getX()).toEqual(1);
        expect(robot.getY()).toEqual(0);
    });
    test('Test if the MoveEast command works as expected for a Placed robot and prevents falling down', () => {
        let robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(4);
        robot.setY(4);
        robot.setDirection(Directions.EAST);
        let response: Response = MoveEast(robot);
        expect(response.Success).toBeFalsy();
    });
})