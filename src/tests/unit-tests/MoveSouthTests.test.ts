import { MoveSouth } from "../../Commands/Move/MoveSouth";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";
import { IMove } from "../../Commands/Move/Move";

describe("MoveSouth", () => {
    test("moves one step south when there is room on the table", () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(1);
        robot.setDirection(Directions.SOUTH);
        const moveSouth: IMove = new MoveSouth();
        const response: Response = moveSouth.move(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getX()).toEqual(0);
        expect(robot.getY()).toEqual(0);
    });
    test("does not move off the table at the south boundary", () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.SOUTH);
        const moveSouth: IMove = new MoveSouth();
        const response: Response = moveSouth.move(robot);
        expect(response.Success).toBeFalsy();
    });
});
