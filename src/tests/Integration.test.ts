import { ParseCommand } from "../Commands/CommandParser";
import { Robot } from "../Models/Robot";
import { Directions } from "../Models/Directions";

describe("Integration", () => {
    test("PLACE sets position, facing, and placed flag via the parser", () => {
        const robot = new Robot(5);
        ParseCommand("PLACE 0,0,NORTH", robot);
        expect(robot.getX()).toEqual(0);
        expect(robot.getY()).toEqual(0);
        expect(robot.getPlaced()).toBe(true);
        expect(robot.getSize()).toEqual(5);
        expect(robot.getDirection()).toEqual(Directions.NORTH);
    });
    test("REPORT before PLACE leaves the robot unplaced", () => {
        const robot = new Robot(5);
        ParseCommand("REPORT", robot);
        expect(robot.getPlaced()).toBe(false);
        expect(robot.getSize()).toEqual(5);
    });
});
