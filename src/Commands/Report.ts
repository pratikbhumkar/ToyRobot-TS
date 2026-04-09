import { Robot, RobotState } from "../Models/Robot";
import { Response } from "../Models/Response";

export type ReportResult = { state: RobotState; response: Response };

export function report(state: RobotState): ReportResult {
    if (state.placed) {
        const output = `Output: ${state.x},${state.y},${state.direction}`;
        console.log(output);
        return { state, response: new Response(true, output) };
    }
    return { state, response: new Response(false, "You need to place before you Report.") };
}

export function Report(robot: Robot): Response {
    const result = report(robot.toState());
    return result.response;
}