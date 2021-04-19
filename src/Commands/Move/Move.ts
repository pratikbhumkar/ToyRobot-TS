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
        var moveNorth:IMove = new MoveNorth();
        return moveNorth.move(robot);
      case Directions.SOUTH:
        var moveSouth:IMove = new MoveSouth();
        return moveSouth.move(robot);
      case Directions.EAST:
        var moveEast:IMove = new MoveEast();
        return moveEast.move(robot);
      case Directions.WEST:
        var moveWest:IMove = new MoveWest();
        return moveWest.move(robot);
    }
  } else {
    return new Response(false, "You need to place before you Move.")
  }
};