import { ParseCommand } from "../Commands/CommandParser";
import { Robot } from "../Models/Robot";
import { Directions } from "../Models/Directions";

describe("Integration", () => {
    test("PLACE sets position, facing, and placed flag via the parser", () => {
        const robot = new Robot(5);
        const nextRobot = ParseCommand("PLACE 0,0,NORTH", robot);
        expect(nextRobot.getX()).toEqual(0);
        expect(nextRobot.getY()).toEqual(0);
        expect(nextRobot.getPlaced()).toBe(true);
        expect(nextRobot.getSize()).toEqual(5);
        expect(nextRobot.getDirection()).toEqual(Directions.NORTH);
    });
    test("REPORT before PLACE leaves the robot unplaced", () => {
        const robot = new Robot(5);
        const nextRobot = ParseCommand("REPORT", robot);
        expect(nextRobot.getPlaced()).toBe(false);
        expect(nextRobot.getSize()).toEqual(5);
    });
});
