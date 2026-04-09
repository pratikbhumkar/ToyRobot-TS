import { TurnLeft, TurnRight, ITurn } from "../../Commands/Turn";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe('Unit Testing for Turn command', () => {
    test('Test if the Turn command works as expected for an un-Placed robot', () => {
        const robot = new Robot(5);
        robot.setPlaced(false);
        const turnLeft: ITurn = new TurnLeft();
        const response: Response = turnLeft.turn(robot);
        expect(response.Success).toBeFalsy();
        expect(response.Message).toEqual(`You need to place before you Turn.`)
    });
    test('Test if the Turn-Left command works as expected for a Placed robot', () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.NORTH);
        const turnLeft: ITurn = new TurnLeft();
        const response: Response = turnLeft.turn(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getDirection()).toEqual(Directions.WEST)
    });
    test('Test if the Turn-Right command works as expected for a Placed robot', () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.NORTH);
        const turnRight: ITurn = new TurnRight();
        const response: Response = turnRight.turn(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getDirection()).toEqual(Directions.EAST)
    });
    test('Test if the Turn-Right command compconstes a full circle for a Placed robot', () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.NORTH);
        const turnRight: ITurn = new TurnRight();
        let response: Response = turnRight.turn(robot);
        response = turnRight.turn(robot);
        response = turnRight.turn(robot);
        response = turnRight.turn(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getDirection()).toEqual(Directions.NORTH)
    });
})