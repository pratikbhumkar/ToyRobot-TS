import { Commands } from "../../Models/Commands";
import { parsePlaceArgs } from "./parsePlaceArgs";

export function identifyCommand(command: string): string | boolean {
    if (/^MOVE$/.test(command)) {
        return Commands.MOVE;
    } else if (/^REPORT$/.test(command)) {
        return Commands.REPORT;
    } else if (/^LEFT$/.test(command)) {
        return Commands.LEFT;
    } else if (/^RIGHT$/.test(command)) {
        return Commands.RIGHT;
    } else if (parsePlaceArgs(command)) {
        return Commands.PLACE;
    }
    return false;
}
