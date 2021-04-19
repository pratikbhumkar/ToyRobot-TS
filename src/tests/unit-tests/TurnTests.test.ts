import { Turn } from "../../Commands/Turn";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe('Unit Testing for Turn command', () => {
    test('Test if the Turn command works as expected for an un-Placed robot', () => {
        let robot = new Robot(5);
        robot.setPlaced(false);
        let response: Response = Turn(Directions.LEFT, robot);
        expect(response.Success).toBeFalsy();
        expect(response.Message).toEqual(`You need to place before you Turn.`)
    });
    test('Test if the Turn-Left command works as expected for a Placed robot', () => {
        let robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.NORTH);
        let response: Response = Turn(Directions.LEFT, robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getDirection()).toEqual(Directions.WEST)
    });
    test('Test if the Turn-Right command works as expected for a Placed robot', () => {
        let robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.NORTH);
        let response: Response = Turn(Directions.RIGHT, robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getDirection()).toEqual(Directions.EAST)
    });
    test('Test if the Turn-Right command completes a full circle for a Placed robot', () => {
        let robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.NORTH);
        let response: Response = Turn(Directions.RIGHT, robot);
        response = Turn(Directions.RIGHT, robot);
        response = Turn(Directions.RIGHT, robot);
        response = Turn(Directions.RIGHT, robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getDirection()).toEqual(Directions.NORTH)
    });
})