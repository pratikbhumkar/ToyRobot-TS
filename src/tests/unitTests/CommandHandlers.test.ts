import { commandHandlers } from "../../Commands/handlers/commandHandlers";
import { Commands } from "../../Models/Commands";
import { Directions } from "../../Models/Directions";
import { RobotState } from "../../Models/Robot";

describe("commandHandlers", () => {
    test("PLACE handler returns invalid command response when parse fails", () => {
        const state: RobotState = {
            x: 0,
            y: 0,
            direction: Directions.NORTH,
            placed: false,
            size: 5
        };

        const result = commandHandlers[Commands.PLACE]("PLACE malformed", state);

        expect(result.state).toEqual(state);
        expect(result.response.Success).toBe(false);
        expect(result.response.Message).toBe("Invalid Command");
    });
});
