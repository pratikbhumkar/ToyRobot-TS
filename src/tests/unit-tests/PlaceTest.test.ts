import { Place } from "../../Commands/Place";
import { Response } from "../../Models/Response";
import { Directions } from "../../Models/Directions";
import { Robot } from "../../Models/Robot";

describe('Unit Testing for Place command.', () => {
    test('Test if the Place command places the robot in the correct position.', () => {
        let robot = new Robot(5);
        let response: Response = Place(4, 4, Directions.EAST, robot);
        expect(response.Success).toBeTruthy();
        expect(robot.x).toEqual(4);
        expect(robot.y).toEqual(4);
        expect(robot.placed).toBeTruthy();
        expect(robot.direction).toEqual(Directions.EAST);
    });
    test('Test if the Place command prevents placing outside', () => {
        let robot = new Robot(5);
        let response: Response = Place(7, 7, Directions.EAST, robot);
        expect(response.Success).toBeFalsy();
        expect(response.Message).toEqual("Cannot place outside the table");
    });
    test('Test if the Place command can be run multiple times to place the robot', () => {
        let robot = new Robot(5);
        let response: Response = Place(2, 2, Directions.EAST, robot);
        expect(response.Success).toBeTruthy();
        expect(robot.x).toEqual(2);
        expect(robot.y).toEqual(2);
        expect(robot.placed).toBeTruthy();
        expect(robot.direction).toEqual(Directions.EAST);

        response = Place(3, 3, Directions.EAST, robot);
        expect(response.Success).toBeTruthy();
        expect(robot.x).toEqual(3);
        expect(robot.y).toEqual(3);
        expect(robot.placed).toBeTruthy();
        expect(robot.direction).toEqual(Directions.EAST);
    });
})