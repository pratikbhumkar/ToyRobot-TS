import { Report } from "../../Commands/Report";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe('Unit Testing for REPORT command', () => {
    test('Test if the REPORT command works as expected for an Placed robot', () => {
        let robot = new Robot(5);
        robot.placed = true;
        robot.x = 0;
        robot.y = 0;
        robot.direction = Directions.NORTH;
        let response: Response = Report(robot);
        expect(response.Success).toBeTruthy();
        expect(response.Message).toEqual(`Output: ${robot.x},${robot.y},${robot.direction}`)
    });

    test('Test if the REPORT command works as expected for an un-Placed robot', () => {
        let robot = new Robot(5);
        robot.placed = false;
        let response: Response = Report(robot);
        expect(response.Success).toBeFalsy();
        expect(response.Message).toEqual(`You need to place before you Report.`)
    });
})
