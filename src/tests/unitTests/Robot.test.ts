import { Directions } from "../../Models/Directions";
import { Robot } from "../../Models/Robot";

describe("Robot", () => {
    test("initializes with the given table size, not placed, and default facing", () => {
        const robot = new Robot(5);
        expect(robot.getPlaced()).toEqual(false);
        expect(robot.getSize()).toEqual(5);
        expect(robot.getDirection()).toEqual(Directions.NORTH);
    });
});
