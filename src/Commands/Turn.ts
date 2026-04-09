import { Directions } from "../Models/Directions";
import { RobotState } from "../Models/Robot";
import { Response } from "../Models/Response";

const FACINGS = Object.values(Directions);

function facingsIndex(facing: string): number {
    return FACINGS.indexOf(facing as Directions);
}

export interface ITurn {
    turn(state: RobotState): TurnResult;
}

export type TurnResult = { state: RobotState; response: Response };

abstract class TurnStrategy implements ITurn {
    protected abstract step: number;

    turn(state: RobotState): TurnResult {
        if (!state.placed) {
            return { state, response: new Response(false, "You need to place before you Turn.") };
        }

        const index = facingsIndex(state.direction);
        if (index === -1) {
            return { state, response: new Response(false, "Invalid direction") };
        }

        const next = FACINGS[(index + this.step + 4) % 4];
        return { state: { ...state, direction: next }, response: new Response(true, "") };
    }
}

export class TurnLeft extends TurnStrategy {
    protected step = 1;
}

export class TurnRight extends TurnStrategy {
    protected step = -1;
}