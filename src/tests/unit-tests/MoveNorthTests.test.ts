import { MoveNorth } from "../../Commands/Move/MoveNorth";
import { Robot } from "../../Models/Robot";
import { Directions } from "../../Models/Directions";
import { Response } from "../../Models/Response";
import { IMove } from "../../Commands/Move/Move";

describe("MoveNorth", () => {
    test("moves one step north when there is room on the table", () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(0);
        robot.setY(0);
        robot.setDirection(Directions.EAST);
        const moveNorth: IMove = new MoveNorth();
        const response: Response = moveNorth.move(robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getX()).toEqual(0);
        expect(robot.getY()).toEqual(1);
    });
    test("does not move off the table at the north boundary", () => {
        const robot = new Robot(5);
        robot.setPlaced(true);
        robot.setX(4);
        robot.setY(4);
        robot.setDirection(Directions.EAST);
        const moveNorth: IMove = new MoveNorth();
        const response: Response = moveNorth.move(robot);
        expect(response.Success).toBeFalsy();
    });
});
