import { Directions } from "../../Models/Directions";
import { Robot } from "../../Models/Robot";
import {MoveEast, MoveNorth, MoveSouth, MoveWest} from "./index"
import { Response } from "../../Models/Response";

export function Move (robot: Robot): Response {
  if (robot.placed) {
    switch (robot.direction) {
      case Directions.NORTH:
        return MoveNorth(robot);
      case Directions.SOUTH:
        return MoveSouth(robot);
      case Directions.EAST:
        return MoveEast(robot);
      case Directions.WEST:
        return MoveWest(robot);
    }
  } else {
    return new Response(false, "You need to place before you Move.")
  }
};