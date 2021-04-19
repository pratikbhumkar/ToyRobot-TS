import { MoveWest } from "../../Commands/Move/MoveWest";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";
import { IMove } from "../../Commands/Move/Move";
describe('Unit Testing for MoveWest command', () => {
    test('Test if the MoveWest command works as expected for a Placed robot', () => {
        let robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(1);
        robot.setY(0);
        robot.setDirection(Directions.WEST);
        var moveWest:IMove = new MoveWest();
        let response: Response = moveWest.move(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getX()).toEqual(0);
        expect(robot.getY()).toEqual(0);
    });
    test('Test if the MoveWest command works as expected for a Placed robot and prevents falling down', () => {
        let robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.WEST);
        var moveWest:IMove = new MoveWest();
        let response: Response = moveWest.move(robot);
        expect(response.Success).toBeFalsy();
    });
})