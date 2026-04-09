import { Directions } from "../Models/Directions";
import { Robot, RobotState } from "../Models/Robot";
import { Response } from "../Models/Response";

export type PlaceResult = { state: RobotState; response: Response };

export function place(state: RobotState, x: number, y: number, direction: Directions): PlaceResult {
    const size = state.size;
    if (x < size && x > -1 && y < size && y > -1) {
        return {
            state: { ...state, x, y, direction, placed: true },
            response: new Response(true, "")
        };
    }
    return { state, response: new Response(false, "Cannot place outside the table") };
}

export function Place(x: number, y: number, direction: Directions, robot: Robot): Response {
    const result = place(robot.toState(), x, y, direction);
    robot.applyState(result.state);
    return result.response;
}