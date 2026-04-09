import { place } from "../Commands/Place";
import { report } from "../Commands/Report";
import { ITurn, TurnLeft, TurnRight } from "../Commands/Turn";
import { Directions } from "../Models/Directions";
import { RobotState } from "../Models/Robot";

describe("PLACE/TURN/REPORT immutability", () => {
    test("place returns next state and does not mutate input state", () => {
        const input: RobotState = {
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: false,
            size: 5
        };

        const result = place(input, 2, 3, Directions.EAST);

        expect(result.state.x).toBe(2);
        expect(result.state.y).toBe(3);
        expect(result.state.direction).toBe(Directions.EAST);
        expect(result.state.placed).toBe(true);
        expect(input.x).toBe(0);
        expect(input.y).toBe(0);
    });

    test("turn transitions are pure and preserve non-facing fields", () => {
        const input: RobotState = {
            x: 1,
            y: 2,
            direction: Directions.NORTH,
            placed: true,
            size: 5
        };

        const leftTurn: ITurn = new TurnLeft();
        const rightTurn: ITurn = new TurnRight();
        const leftResult = leftTurn.turn(input);
        const rightResult = rightTurn.turn(input);

        expect(leftResult.state.direction).toBe(Directions.WEST);
        expect(rightResult.state.direction).toBe(Directions.EAST);
        expect(leftResult.state.x).toBe(1);
        expect(leftResult.state.y).toBe(2);
        expect(input.direction).toBe(Directions.NORTH);
    });

    test("report preserves state and returns output message", () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
        const input: RobotState = {
            x: 1,
            y: 1,
            direction: Directions.SOUTH,
            placed: true,
            size: 5
        };

        const result = report(input);

        expect(result.state).toEqual(input);
        expect(result.response.Success).toBe(true);
        expect(result.response.Message).toBe("Output: 1,1,SOUTH");
        expect(logSpy).toHaveBeenCalledWith("Output: 1,1,SOUTH");
        logSpy.mockRestore();
    });
});
