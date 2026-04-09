import { MoveNorth } from "../../Commands/Move/MoveNorth";
import { RobotState } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { IMove } from "../../Commands/Move/Move";

describe("MoveNorth", () => {
    test("moves one step north when there is room on the table", () => {
        const state: RobotState = {
            x: 0,
            y: 0,
            direction: Directions.EAST,
            placed: true,
            size: 5
        };
        const moveNorth: IMove = new MoveNorth();
        const result = moveNorth.move(state);
        expect(result.response.Success).toBeTruthy();
        expect(result.state.x).toEqual(0);
        expect(result.state.y).toEqual(1);
    });
    test("does not move off the table at the north boundary", () => {
        const state: RobotState = {
            x: 4,
            y: 4,
            direction: Directions.EAST,
            placed: true,
            size: 5
        };
        const moveNorth: IMove = new MoveNorth();
        const result = moveNorth.move(state);
        expect(result.response.Success).toBeFalsy();
    });
});
