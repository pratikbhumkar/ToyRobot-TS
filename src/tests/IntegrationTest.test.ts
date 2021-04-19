import { ParseCommand } from '../Commands/CommandParser';
import { Robot } from "../Models/Robot";
import { Directions } from "../Models/Directions";


describe('Integration Testing ', () => {
    test('Testing if the robot is placed on Place command', () => {
        let robot = new Robot(5);
        ParseCommand("PLACE 0,0,NORTH", robot);
        expect(robot.getX()).toEqual(0);
        expect(robot.getY()).toEqual(0);
        expect(robot.getPlaced()).toEqual(true);
        expect(robot.getSize()).toEqual(5);
        expect(robot.getDirection()).toEqual(Directions.NORTH);
    });
    test('Testing if REPORT command can be run before PLACE', () => {
        let robot = new Robot(5);
        ParseCommand("REPORT", robot);
        expect(robot.getPlaced()).toEqual(false);
        expect(robot.getSize()).toEqual(5);
    });
})
