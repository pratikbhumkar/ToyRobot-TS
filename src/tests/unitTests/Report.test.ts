import { Report } from "../../Commands/Report";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";

describe("Report", () => {
    let logSpy: jest.SpiedFunction<typeof console.log>;

    beforeEach(() => {
        logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    test("returns output with position and facing when the robot is placed", () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.NORTH);
        const response: Response = Report(robot);
        expect(response.Success).toBeTruthy();
        expect(response.Message).toEqual(
            `Output: ${robot.getX()},${robot.getY()},${robot.getDirection()}`
        );
        expect(logSpy).not.toHaveBeenCalled();
    });

    test("returns failure when the robot has not been placed", () => {
        const robot = new Robot(5);
        robot.setPlaced(false);
        const response: Response = Report(robot);
        expect(response.Success).toBeFalsy();
        expect(response.Message).toEqual("You need to place before you Report.");
        expect(logSpy).not.toHaveBeenCalled();
    });
});
