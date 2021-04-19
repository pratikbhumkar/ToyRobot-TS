import { MoveNorth } from "../../Commands/Move/MoveNorth";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";
import { IMove } from "../../Commands/Move/Move";
describe('Unit Testing for MoveNorth command', () => {
    test('Test if the MoveNorth command works as expected for a Placed robot', () => {
        let robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.EAST);
        var moveNorth:IMove = new MoveNorth();
        let response: Response = moveNorth.move(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getX()).toEqual(0);
        expect(robot.getY()).toEqual(1);
    });
    test('Test if the MoveNorth command works as expected for a Placed robot and prevents falling down', () => {
        let robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(4);
        robot.setY(4);
        robot.setDirection(Directions.EAST)
        var moveNorth:IMove = new MoveNorth();
        let response: Response = moveNorth.move(robot);
        expect(response.Success).toBeFalsy();
    });
})