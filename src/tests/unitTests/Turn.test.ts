import { TurnLeft, TurnRight, ITurn } from "../../Commands/Turn";
import { Directions } from "../../Models/Directions";
import { RobotState } from "../../Models/Robot";

describe("Turn", () => {
    test("TurnLeft returns failure when the robot has not been placed", () => {
        const state: RobotState = {
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: false,
            size: 5
        };
        const turnLeft: ITurn = new TurnLeft();
        const result = turnLeft.turn(state);
        expect(result.response.Success).toBeFalsy();
        expect(result.response.Message).toEqual("You need to place before you Turn.");
    });
    test("TurnLeft rotates from NORTH to WEST when placed", () => {
        const state: RobotState = {
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: true,
            size: 5
        };
        const turnLeft: ITurn = new TurnLeft();
        const result = turnLeft.turn(state);
        expect(result.response.Success).toBeTruthy();
        expect(result.state.direction).toEqual(Directions.WEST);
        expect(state.direction).toEqual(Directions.NORTH);
    });
    test("TurnRight rotates from NORTH to EAST when placed", () => {
        const state: RobotState = {
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: true,
            size: 5
        };
        const turnRight: ITurn = new TurnRight();
        const result = turnRight.turn(state);
        expect(result.response.Success).toBeTruthy();
        expect(result.state.direction).toEqual(Directions.EAST);
    });
    test("TurnRight four times returns facing to NORTH when placed", () => {
        const state: RobotState = {
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: true,
            size: 5
        };
        const turnRight: ITurn = new TurnRight();
        let result = turnRight.turn(state);
        result = turnRight.turn(result.state);
        result = turnRight.turn(result.state);
        result = turnRight.turn(result.state);
        expect(result.response.Success).toBeTruthy();
        expect(result.state.direction).toEqual(Directions.NORTH);
    });
});
