import { ParseCommand } from "../Commands/CommandParser";
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

        expect(next.getY()).toBe(1);
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

        expect(left.getDirection()).toBe(Directions.WEST);
        expect(right.getDirection()).toBe(Directions.EAST);
        expect(left.getX()).toBe(0);
        expect(left.getY()).toBe(0);
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

        expect(next.toState()).toEqual(original.toState());
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

        expect(next.toState()).toEqual(robot.toState());
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

        expect(next.toState()).toEqual(robot.toState());
        expect(logSpy).toHaveBeenCalledWith("Invalid Command");
    });
});
