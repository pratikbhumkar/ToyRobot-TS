import { RobotState } from "../../Models/Robot";
import { Response } from "../../Models/Response";
import { IMove } from "./Move";

export class MoveWest implements IMove {
    move(state: RobotState) {
        if (state.x > 0) {
            return { state: { ...state, x: state.x - 1 }, response: new Response(true, "Success") };
        }
        return { state, response: new Response(false, "Cannot move outside the table") };
    }
}
