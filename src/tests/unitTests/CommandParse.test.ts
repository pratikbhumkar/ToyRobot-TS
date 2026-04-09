import { identifyCommand } from "../../Commands/parsing/identifyCommand";
import { parsePlaceArgs } from "../../Commands/parsing/parsePlaceArgs";
import { displayErrorMessage, presentResponse } from "../../DisplayMessage";
import { Response } from "../../Models/Response";
import { Commands } from "../../Models/Commands";

describe("displayErrorMessage", () => {
    let logSpy: jest.SpiedFunction<typeof console.log>;

    beforeEach(() => {
        logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    test("returns the message when the response is unsuccessful", () => {
        const response = new Response(false, "Error");
        const returnMessage = displayErrorMessage(response);
        expect(returnMessage).toEqual("Error");
        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith("Error");
    });
    test("returns an empty string when the response is successful", () => {
        const response = new Response(true, "Message");
        const returnMessage = displayErrorMessage(response);
        expect(returnMessage).toEqual("");
        expect(logSpy).not.toHaveBeenCalled();
    });

    test("presentResponse handles unknown command identity without logging success output", () => {
        const response = new Response(true, "Output: 1,2,NORTH");
        const returnMessage = presentResponse(false, response);
        expect(returnMessage).toEqual("");
        expect(logSpy).not.toHaveBeenCalled();
    });

    test("presentResponse logs successful REPORT output when command identity is REPORT", () => {
        const response = new Response(true, "Output: 1,2,NORTH");
        const returnMessage = presentResponse(Commands.REPORT, response);
        expect(returnMessage).toEqual("Output: 1,2,NORTH");
        expect(logSpy).toHaveBeenCalledWith("Output: 1,2,NORTH");
    });
});

describe("identifyCommand", () => {
    test("recognizes REPORT", () => {
        expect(identifyCommand("REPORT")).toEqual(Commands.REPORT);
    });
    test("recognizes LEFT", () => {
        expect(identifyCommand("LEFT")).toEqual(Commands.LEFT);
    });
    test("recognizes RIGHT", () => {
        expect(identifyCommand("RIGHT")).toEqual(Commands.RIGHT);
    });
    test("recognizes MOVE", () => {
        expect(identifyCommand("MOVE")).toEqual(Commands.MOVE);
    });
    test("recognizes a valid PLACE line", () => {
        expect(identifyCommand("PLACE 0,0,NORTH")).toEqual(Commands.PLACE);
    });
    test("rejects PLACE with only a trailing comma after coordinates", () => {
        expect(identifyCommand("PLACE 0,")).toBeFalsy();
    });

    describe("PLACE edge cases", () => {
        test("rejects PLACE with keyword only", () => {
            expect(identifyCommand("PLACE")).toBeFalsy();
        });
        test("rejects PLACE with a single coordinate", () => {
            expect(identifyCommand("PLACE 0")).toBeFalsy();
        });
        test("rejects mixed-case place (wrong casing)", () => {
            expect(identifyCommand("place 0,0")).toBeFalsy();
        });
        test("rejects fully lowercase PLACE line", () => {
            expect(identifyCommand("place 0,0,north")).toBeFalsy();
        });
    });

    test("PLACE classification stays aligned with PLACE argument parser", () => {
        const validPlace = "PLACE 0,0,NORTH";
        const invalidPlace = "PLACE 0,";
        expect(identifyCommand(validPlace)).toEqual(Commands.PLACE);
        expect(parsePlaceArgs(validPlace)).not.toBeNull();
        expect(identifyCommand(invalidPlace)).toBeFalsy();
        expect(parsePlaceArgs(invalidPlace)).toBeNull();
    });
});
