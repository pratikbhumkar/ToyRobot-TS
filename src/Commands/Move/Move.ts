import { Directions } from "../../Models/Directions";
import { Robot } from "../../Models/Robot";
import {MoveEast, MoveNorth, MoveSouth, MoveWest} from "./index"
import { Response } from "../../Models/Response";

export interface IMove {
  move(robot: Robot):Response
}

export function Move (robot: Robot): Response {
  if (robot.getPlaced()) {
    switch (robot.getDirection()) {
      case Directions.NORTH:
        const moveNorth:IMove = new MoveNorth();
        return moveNorth.move(robot);
      case Directions.SOUTH:
        const moveSouth:IMove = new MoveSouth();
        return moveSouth.move(robot);
      case Directions.EAST:
        const moveEast:IMove = new MoveEast();
        return moveEast.move(robot);
      case Directions.WEST:
        const moveWest:IMove = new MoveWest();
        return moveWest.move(robot);
      default:
        return new Response(false, "Invalid direction")
    }
  } else {
    return new Response(false, "You need to place before you Move.")
  }
};