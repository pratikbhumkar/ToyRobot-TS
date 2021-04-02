import { ParseCommand } from '../Commands/CommandParser';
import { Robot } from "../Models/Robot";
import { Directions } from "../Models/Directions";


describe('Integration Testing ', () => {
    test('Testing if the robot is placed on Place command', () => {
        let robot = new Robot(5);
        ParseCommand("PLACE 0,0,NORTH", robot);
        expect(robot.x).toEqual(0);
        expect(robot.y).toEqual(0);
        expect(robot.placed).toEqual(true);
        expect(robot.size).toEqual(5);
        expect(robot.direction).toEqual(Directions.NORTH);
    });
    test('Testing if REPORT command can be run before PLACE', () => {
        let robot = new Robot(5);
        ParseCommand("REPORT", robot);
        expect(robot.placed).toEqual(false);
        expect(robot.size).toEqual(5);
    });
})
