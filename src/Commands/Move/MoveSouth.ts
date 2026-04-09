import { RobotState } from "../../Models/Robot";
import { Response } from "../../Models/Response";
import { IMove } from "./Move";

export class MoveSouth implements IMove {
    move(state: RobotState) {
        if (state.y > 0) {
            return { state: { ...state, y: state.y - 1 }, response: new Response(true, "Success") };
        }
        return { state, response: new Response(false, "Cannot move outside the table") };
    }
}
