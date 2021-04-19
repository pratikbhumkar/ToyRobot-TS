import { Directions } from "../Models/Directions";
import { Robot } from "../Models/Robot";
import { Response } from "../Models/Response";

export interface ITurn {
    turn(robot: Robot): Response
}

export class TurnLeft implements ITurn {
    turn(robot: Robot): Response {
        if (robot.getPlaced()) {
            let directions = Object.keys(Directions);
            let currentDirectionIndex = directions.indexOf(robot.getDirection());
            let sizeLimit = (robot.getSize() - 1)
            currentDirectionIndex = (currentDirectionIndex + 1) % sizeLimit;
            robot.setDirection(directions[currentDirectionIndex]);
            return new Response(true, "")
        } else {
            return new Response(false, "You need to place before you Turn.")
        }
    }
}

export class TurnRight implements ITurn {
    turn(robot: Robot): Response {
        if (robot.getPlaced()) {
            let directions = Object.keys(Directions);
            let currentDirectionIndex = directions.indexOf(robot.getDirection());
            let sizeLimit = (robot.getSize() - 1)
            currentDirectionIndex = (currentDirectionIndex - 1 + sizeLimit) % sizeLimit;
            robot.setDirection(directions[currentDirectionIndex]);
            return new Response(true, "")
        } else {
            return new Response(false, "You need to place before you Turn.")
        }
    }
}