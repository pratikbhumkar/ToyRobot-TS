import { move } from "../Commands/Move/Move";
import { Directions } from "../Models/Directions";
import { RobotState } from "../Models/Robot";

describe("MOVE immutability", () => {
    test("returns next state without mutating input state", () => {
        const input: RobotState = {
            x: 0,
            y: 0,
            direction: Directions.EAST,
            placed: true,
            size: 5
        };

        const result = move(input);

        expect(result.state.x).toBe(1);
        expect(input.x).toBe(0);
        expect(result.response.Success).toBe(true);
        expect(result.response.Message).toBe("Success");
    });

    test("returns unchanged state and boundary message when moving off table", () => {
        const input: RobotState = {
            x: 4,
            y: 0,
            direction: Directions.EAST,
            placed: true,
            size: 5
        };

        const result = move(input);

        expect(result.state).toEqual(input);
        expect(result.response.Success).toBe(false);
        expect(result.response.Message).toBe("Cannot move outside the table");
    });

    test("moves south and west without mutating the input object", () => {
        const southInput: RobotState = {
            x: 1,
            y: 1,
            direction: Directions.SOUTH,
            placed: true,
            size: 5
        };
        const southResult = move(southInput);
        expect(southResult.state.y).toBe(0);
        expect(southInput.y).toBe(1);

        const westInput: RobotState = {
            x: 1,
            y: 1,
            direction: Directions.WEST,
            placed: true,
            size: 5
        };
        const westResult = move(westInput);
        expect(westResult.state.x).toBe(0);
        expect(westInput.x).toBe(1);
    });

    test("returns invalid direction for unknown facing", () => {
        const input: RobotState = {
            x: 0,
            y: 0,
            direction: "UNKNOWN" as unknown as Directions,
            placed: true,
            size: 5
        };

        const result = move(input);

        expect(result.state).toEqual(input);
        expect(result.response.Success).toBe(false);
        expect(result.response.Message).toBe("Invalid direction");
    });
});
