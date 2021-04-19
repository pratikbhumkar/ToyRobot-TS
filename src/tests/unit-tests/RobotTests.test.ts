import { Robot } from "../../Models/Robot";

describe('Testing robot', () => {
    test('Testing if robot is initialized and has the size assigned.', () => {
        let robot = new Robot(5);
        expect(robot.getPlaced()).toEqual(false);
        expect(robot.getSize()).toEqual(5);
        expect(robot.getDirection()).toEqual(undefined);
    });
});