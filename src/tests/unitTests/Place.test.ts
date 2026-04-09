import { Place } from "../../Commands/Place";
import { Response } from "../../Models/Response";
import { Directions } from "../../Models/Directions";
import { Robot } from "../../Models/Robot";

describe("Place", () => {
    test("sets position and facing on a valid in-bounds placement", () => {
        const robot = new Robot(5);
        const response: Response = Place(4, 4, Directions.EAST, robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getX()).toEqual(4);
        expect(robot.getY()).toEqual(4);
        expect(robot.getPlaced()).toBeTruthy();
        expect(robot.getDirection()).toEqual(Directions.EAST);
    });
    test("rejects placement outside the table", () => {
        const robot = new Robot(5);
        const response: Response = Place(7, 7, Directions.EAST, robot);
        expect(response.Success).toBeFalsy();
        expect(response.Message).toEqual("Cannot place outside the table");
    });
    test("allows multiple valid PLACE commands to update the robot", () => {
        const robot = new Robot(5);
        let response: Response = Place(2, 2, Directions.EAST, robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getX()).toEqual(2);
        expect(robot.getY()).toEqual(2);
        expect(robot.getPlaced()).toBeTruthy();
        expect(robot.getDirection()).toEqual(Directions.EAST);

        response = Place(3, 3, Directions.EAST, robot);
        expect(response.Success).toBeTruthy();
        expect(robot.getX()).toEqual(3);
        expect(robot.getY()).toEqual(3);
        expect(robot.getPlaced()).toBeTruthy();
        expect(robot.getDirection()).toEqual(Directions.EAST);
    });
});
