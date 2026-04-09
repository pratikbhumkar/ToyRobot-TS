import { ParseCommand } from "../Commands/CommandParser";
import { identifyCommand } from "../Commands/parsing/identifyCommand";
import { presentResponse } from "../DisplayMessage";
import { Directions } from "../Models/Directions";
import { Robot } from "../Models/Robot";

describe("ParseCommand pure transition flow", () => {
    let logSpy: jest.SpiedFunction<typeof console.log>;

    beforeEach(() => {
        logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    test("MOVE returns a new robot and leaves previous instance unchanged", () => {
        const original = Robot.fromState({
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: true,
            size: 5
        });

        const next = ParseCommand("MOVE", original);
        const nextRobot = Robot.fromState(next.state);

        expect(nextRobot.getY()).toBe(1);
        expect(original.getY()).toBe(0);
    });

    test("LEFT and RIGHT rotate facing while preserving table bounds", () => {
        const placed = Robot.fromState({
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: true,
            size: 5
        });

        const left = ParseCommand("LEFT", placed);
        const right = ParseCommand("RIGHT", placed);
        const leftRobot = Robot.fromState(left.state);
        const rightRobot = Robot.fromState(right.state);

        expect(leftRobot.getDirection()).toBe(Directions.WEST);
        expect(rightRobot.getDirection()).toBe(Directions.EAST);
        expect(leftRobot.getX()).toBe(0);
        expect(leftRobot.getY()).toBe(0);
    });

    test("PLACE outside table preserves state and reports error", () => {
        const original = Robot.fromState({
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: false,
            size: 5
        });

        const next = ParseCommand("PLACE 7,7,EAST", original);
        presentResponse(identifyCommand("PLACE 7,7,EAST"), next.response);

        expect(next.state).toEqual(original.toState());
        expect(logSpy).toHaveBeenCalledWith("Cannot place outside the table");
    });

    test("REPORT when placed logs output and preserves state", () => {
        const robot = Robot.fromState({
            x: 1,
            y: 2,
            direction: Directions.SOUTH,
            placed: true,
            size: 5
        });

        const next = ParseCommand("REPORT", robot);
        presentResponse(identifyCommand("REPORT"), next.response);

        expect(next.state).toEqual(robot.toState());
        expect(logSpy).toHaveBeenCalledWith("Output: 1,2,SOUTH");
    });

    test("invalid command leaves state unchanged and logs invalid command", () => {
        const robot = Robot.fromState({
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: false,
            size: 5
        });

        const next = ParseCommand("DANCE", robot);
        presentResponse(identifyCommand("DANCE"), next.response);

        expect(next.state).toEqual(robot.toState());
        expect(logSpy).toHaveBeenCalledWith("Invalid Command");
    });
});
