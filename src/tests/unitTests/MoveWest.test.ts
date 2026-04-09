import { MoveWest } from "../../Commands/Move/MoveWest";
import { RobotState } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { IMove } from "../../Commands/Move/Move";

describe("MoveWest", () => {
    test("moves one step west when there is room on the table", () => {
        const state: RobotState = {
            x: 1,
            y: 0,
            direction: Directions.WEST,
            placed: true,
            size: 5
        };
        const moveWest: IMove = new MoveWest();
        const result = moveWest.move(state);
        expect(result.response.Success).toBeTruthy();
        expect(result.state.x).toEqual(0);
        expect(result.state.y).toEqual(0);
    });
    test("does not move off the table at the west boundary", () => {
        const state: RobotState = {
            x: 0,
            y: 0,
            direction: Directions.WEST,
            placed: true,
            size: 5
        };
        const moveWest: IMove = new MoveWest();
        const result = moveWest.move(state);
        expect(result.response.Success).toBeFalsy();
    });
});
