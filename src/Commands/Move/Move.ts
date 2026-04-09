import { Directions } from "../../Models/Directions";
import { Robot, RobotState } from "../../Models/Robot";
import { Response } from "../../Models/Response";
import { MoveEast, MoveNorth, MoveSouth, MoveWest } from "./index";

export type TransitionResult = { state: RobotState; response: Response };

export interface IMove {
  move(state: RobotState): TransitionResult
}

export function move(state: RobotState): TransitionResult {
  if (!state.placed) {
    return { state, response: new Response(false, "You need to place before you Move.") };
  }

  switch (state.direction) {
      case Directions.NORTH:
        return new MoveNorth().move(state);
      case Directions.SOUTH:
        return new MoveSouth().move(state);
      case Directions.EAST:
        return new MoveEast().move(state);
      case Directions.WEST:
        return new MoveWest().move(state);
      default:
        return { state, response: new Response(false, "Invalid direction") };
  }
}

export function Move(robot: Robot): Response {
  const result = move(robot.toState());
  robot.applyState(result.state);
  return result.response;
}