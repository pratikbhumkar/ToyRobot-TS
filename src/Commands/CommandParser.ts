import { TransitionResult } from "./Move/Move";
import { commandHandlers } from "./handlers/commandHandlers";
import { identifyCommand } from "./parsing/identifyCommand";
import { Commands } from "../Models/Commands";
import { Robot, RobotState } from "../Models/Robot";
import { Response } from "../Models/Response";

function handleCommand(command: string, state: RobotState): TransitionResult {
    const identifiedCommand = identifyCommand(command);
    if (!identifiedCommand || typeof identifiedCommand !== "string") {
        return { state, response: new Response(false, "Invalid Command") };
    }
    return commandHandlers[identifiedCommand as Commands](command, state);
}

export function ParseCommand(command:string, robot:Robot): TransitionResult {
    return handleCommand(command, robot.toState());
}