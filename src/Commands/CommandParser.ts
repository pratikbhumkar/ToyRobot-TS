import { Place, Report, Turn, Move } from "./index";
import { Commands } from "../Models/Commands";
import { Directions } from "../Models/Directions";
import { Robot } from "../Models/Robot";

export function ParseCommand(command:any, robot:Robot): any {
    let identifiedCommand = identifyCommand(command);
    switch (identifiedCommand) {
        case Commands.PLACE:
            let placeCoordinates = command.match(/(\d[\d\.]*)/g)
            let placeDirection = command.match(/(NORTH$|SOUTH$|EAST$|WEST$)/g)
            let outcome = Place(placeCoordinates[0], placeCoordinates[1], placeDirection[0], robot)
            if (!outcome.Success) {
                console.log(outcome.Message)
            }
            return outcome;

        case Commands.MOVE:
            let output = Move(robot)
            if (!output.Success) {
                console.log(output.Message)
            }
            break;

        case Commands.LEFT:
            Turn(Directions.LEFT, robot)
            break;

        case Commands.RIGHT:
            Turn(Directions.RIGHT, robot)
            break;

        case Commands.REPORT:
            Report(robot)
            break;

        default:
            console.log('Invalid Command')
            break;
    }
}

function identifyCommand(command: string) {
    if (/^MOVE$/.test(command)) {
        return Commands.MOVE;
    } else if (/^REPORT$/.test(command)) {
        return Commands.REPORT;
    } else if (/^LEFT$/.test(command)) {
        return Commands.LEFT;
    } else if (/^RIGHT$/.test(command)) {
        return Commands.RIGHT;
    }
    else if (/^PLACE\s-?\d+,-?\d+,(NORTH$|SOUTH$|EAST$|WEST$)/.test(command)) {
        return Commands.PLACE;
    }
    return false;
}