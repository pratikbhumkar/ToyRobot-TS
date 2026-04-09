import { MoveWest } from "../../Commands/Move/MoveWest";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";
import { IMove } from "../../Commands/Move/Move";

describe("MoveWest", () => {
    test("moves one step west when there is room on the table", () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(1);
        robot.setY(0);
        robot.setDirection(Directions.WEST);
        const moveWest: IMove = new MoveWest();
        const response: Response = moveWest.move(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getX()).toEqual(0);
        expect(robot.getY()).toEqual(0);
    });
    test("does not move off the table at the west boundary", () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.WEST);
        const moveWest: IMove = new MoveWest();
        const response: Response = moveWest.move(robot);
        expect(response.Success).toBeFalsy();
    });
});
