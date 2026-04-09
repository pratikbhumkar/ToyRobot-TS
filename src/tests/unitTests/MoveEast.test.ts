import { MoveEast } from "../../Commands/Move/MoveEast";
import { RobotState } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { IMove } from "../../Commands/Move/Move";

describe("MoveEast", () => {
    test("moves one step east when there is room on the table", () => {
        const state: RobotState = {
            x: 0,
            y: 0,
            direction: Directions.EAST,
            placed: true,
            size: 5
        };
        const moveEast: IMove = new MoveEast();
        const result = moveEast.move(state);
        expect(result.response.Success).toBeTruthy();
        expect(result.state.x).toEqual(1);
        expect(result.state.y).toEqual(0);
    });
    test("does not move off the table at the east boundary", () => {
        const state: RobotState = {
            x: 4,
            y: 4,
            direction: Directions.EAST,
            placed: true,
            size: 5
        };
        const moveEast: IMove = new MoveEast();
        const result = moveEast.move(state);
        expect(result.response.Success).toBeFalsy();
    });
});
