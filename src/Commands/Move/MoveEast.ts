import { Response } from "../../Models/Response";
import { RobotState } from "../../Models/Robot";
import { IMove } from "./Move";

export class MoveEast implements IMove {
    move(state: RobotState) {
        if (state.x < state.size - 1) {
            return { state: { ...state, x: state.x + 1 }, response: new Response(true, "Success") };
        }
        return { state, response: new Response(false, "Cannot move outside the table") };
    }
}
