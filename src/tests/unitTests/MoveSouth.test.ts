import { MoveSouth } from "../../Commands/Move/MoveSouth";
import { RobotState } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { IMove } from "../../Commands/Move/Move";

describe("MoveSouth", () => {
    test("moves one step south when there is room on the table", () => {
        const state: RobotState = {
            x: 0,
            y: 1,
            direction: Directions.SOUTH,
            placed: true,
            size: 5
        };
        const moveSouth: IMove = new MoveSouth();
        const result = moveSouth.move(state);
        expect(result.response.Success).toBeTruthy();
        expect(result.state.x).toEqual(0);
        expect(result.state.y).toEqual(0);
    });
    test("does not move off the table at the south boundary", () => {
        const state: RobotState = {
            x: 0,
            y: 0,
            direction: Directions.SOUTH,
            placed: true,
            size: 5
        };
        const moveSouth: IMove = new MoveSouth();
        const result = moveSouth.move(state);
        expect(result.response.Success).toBeFalsy();
    });
});
