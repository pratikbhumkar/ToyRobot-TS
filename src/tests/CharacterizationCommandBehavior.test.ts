import { ParseCommand } from "../Commands/CommandParser";
import { identifyCommand } from "../Commands/parsing/identifyCommand";
import { presentResponse } from "../DisplayMessage";
import { Directions } from "../Models/Directions";
import { Robot } from "../Models/Robot";

describe("Command behavior characterization", () => {
    let logSpy: jest.SpiedFunction<typeof console.log>;

    beforeEach(() => {
        logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    test("invalid PLACE format behaves as invalid command and preserves state", () => {
        const robot = Robot.fromState({
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: false,
            size: 5
        });

        const next = ParseCommand("PLACE A,B,NORTH", robot);
        presentResponse(identifyCommand("PLACE A,B,NORTH"), next.response);

        expect(next.state).toEqual(robot.toState());
        expect(logSpy).toHaveBeenCalledWith("Invalid Command");
    });

    test("invalid command preserves state and logs invalid command", () => {
        const robot = Robot.fromState({
            x: 1,
            y: 1,
            direction: Directions.EAST,
            placed: true,
            size: 5
        });

        const next = ParseCommand("SPIN", robot);
        presentResponse(identifyCommand("SPIN"), next.response);

        expect(next.state).toEqual(robot.toState());
        expect(logSpy).toHaveBeenCalledWith("Invalid Command");
    });

    test("REPORT prints output and does not change state", () => {
        const robot = Robot.fromState({
            x: 2,
            y: 3,
            direction: Directions.WEST,
            placed: true,
            size: 5
        });

        const next = ParseCommand("REPORT", robot);
        presentResponse(identifyCommand("REPORT"), next.response);

        expect(next.state).toEqual(robot.toState());
        expect(logSpy).toHaveBeenCalledWith("Output: 2,3,WEST");
    });

    test("MOVE then LEFT keeps parity for position and facing", () => {
        const robot = Robot.fromState({
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: true,
            size: 5
        });

        const afterMove = ParseCommand("MOVE", robot);
        const afterMoveRobot = Robot.fromState(afterMove.state);
        const afterLeft = ParseCommand("LEFT", afterMoveRobot);
        const afterLeftRobot = Robot.fromState(afterLeft.state);

        expect(afterMoveRobot.getX()).toBe(0);
        expect(afterMoveRobot.getY()).toBe(1);
        expect(afterLeftRobot.getDirection()).toBe(Directions.WEST);
        expect(afterLeftRobot.getX()).toBe(0);
        expect(afterLeftRobot.getY()).toBe(1);
    });
});
