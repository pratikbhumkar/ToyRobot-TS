import { move, TransitionResult } from "./Move/Move";
import { place } from "./Place";
import { report } from "./Report";
import { ITurn, TurnLeft, TurnRight } from "./Turn";
import { Commands } from "../Models/Commands";
import { Robot, RobotState } from "../Models/Robot";
import { Response } from "../Models/Response";
import { displayErrorMessage } from "../DisplayMessage";

function placeTransition(command: string, state: RobotState): TransitionResult {
    const placeCoordinates = command.match(/(\d[\d\.]*)/g);
    const placeDirection = command.match(/(NORTH$|SOUTH$|EAST$|WEST$)/g);

    if (!(placeCoordinates && placeCoordinates.length === 2 && placeDirection && placeDirection.length === 1)) {
        return { state, response: new Response(true, "") };
    }

    const x = Number(placeCoordinates[0]);
    const y = Number(placeCoordinates[1]);
    const direction = placeDirection[0];

    return place(state, x, y, direction);
}

function handleCommand(command: string, state: RobotState): TransitionResult {
    switch (identifyCommand(command)) {
        case Commands.PLACE:
            return placeTransition(command, state);
        case Commands.MOVE:
            return move(state);
        case Commands.LEFT:
            const turnLeft: ITurn = new TurnLeft();
            return turnLeft.turn(state);
        case Commands.RIGHT:
            const turnRight: ITurn = new TurnRight();
            return turnRight.turn(state);
        case Commands.REPORT:
            return report(state);
        default:
            console.log("Invalid Command");
            return { state, response: new Response(true, "") };
    }
}

export function ParseCommand(command:string, robot:Robot): Robot {
    const transitionResult = handleCommand(command, robot.toState());
    displayErrorMessage(transitionResult.response);
    return Robot.fromState(transitionResult.state);
}

export function identifyCommand(command: string):string|boolean {
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