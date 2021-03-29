import { Place, Report, Turn, Move } from "./index";
import { Commands } from "../Models/Commands";
import { Directions } from "../Models/Directions";
import { Robot } from "../Models/Robot";
import { Response } from "../Models/Response";

export function ParseCommand(command:any, robot:Robot): void {
    let identifiedCommand: string|boolean = identifyCommand(command);
    switch (identifiedCommand) {
        case Commands.PLACE:
            let placeCoordinates = command.match(/(\d[\d\.]*)/g)
            let placeDirection = command.match(/(NORTH$|SOUTH$|EAST$|WEST$)/g)
            let outcome = Place(placeCoordinates[0], placeCoordinates[1], placeDirection[0], robot)
            displayErrorMessage(outcome)
            break;
            
        case Commands.MOVE:
            let moveResponse:Response = Move(robot)
            displayErrorMessage(moveResponse)
            break;

        case Commands.LEFT:
            let turnLeftResponse:Response = Turn(Directions.LEFT, robot)
            displayErrorMessage(turnLeftResponse)
            break;

        case Commands.RIGHT:
            let turnRightResponse:Response = Turn(Directions.RIGHT, robot)
            displayErrorMessage(turnRightResponse)
            break;

        case Commands.REPORT:
            let reportResponse:Response = Report(robot)
            displayErrorMessage(reportResponse)
            break;

        default:
            console.log('Invalid Command')
            break;
    }
}

function displayErrorMessage(response: Response): void{
    if (!response.Success) {
        console.log(response.Message)
    }
}

function identifyCommand(command: string):string|boolean {
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