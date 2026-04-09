import { Commands } from "../../Models/Commands";
import { Response } from "../../Models/Response";
import { RobotState } from "../../Models/Robot";
import { move, TransitionResult } from "../Move/Move";
import { place } from "../Place";
import { report } from "../Report";
import { ITurn, TurnLeft, TurnRight } from "../Turn";
import { parsePlaceArgs } from "../parsing/parsePlaceArgs";

export type CommandHandler = (command: string, state: RobotState) => TransitionResult;

export const commandHandlers: Record<Commands, CommandHandler> = {
    [Commands.PLACE]: (command, state) => {
        const parsed = parsePlaceArgs(command);
        if (!parsed) {
            return { state, response: new Response(false, "Invalid Command") };
        }
        return place(state, parsed.x, parsed.y, parsed.direction);
    },
    [Commands.MOVE]: (_command, state) => move(state),
    [Commands.LEFT]: (_command, state) => {
        const turnLeft: ITurn = new TurnLeft();
        return turnLeft.turn(state);
    },
    [Commands.RIGHT]: (_command, state) => {
        const turnRight: ITurn = new TurnRight();
        return turnRight.turn(state);
    },
    [Commands.REPORT]: (_command, state) => report(state)
};
