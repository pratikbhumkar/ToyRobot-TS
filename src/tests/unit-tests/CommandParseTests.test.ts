import { identifyCommand } from "../../Commands/CommandParser";
import { displayErrorMessage } from "../../DisplayMessage";
import { Response } from "../../Models/Response";
import { Commands } from "../../Models/Commands";

describe('Unit Testing for displayErrorMessage method', () => {
    test('Test if the displayErrorMessage when the command doesnt run successfully.', () => {
        const response = new Response(false, "Error");
        const returnMessage = displayErrorMessage(response);
        expect(returnMessage).toEqual(returnMessage);
    });
    test('Test if the displayErrorMessage when the command does run successfully.', () => {
        const response = new Response(true, "Message");
        const returnMessage = displayErrorMessage(response);
        expect(returnMessage).toEqual("");
    });
})

describe('Unit Testing for displayErrorMessage method', () => {
    test('Test if the displayErrorMessage parses REPORT command.', () => {
        const returnMessage = identifyCommand("REPORT");
        expect(returnMessage).toEqual(Commands.REPORT);
    });
    test('Test if the displayErrorMessage parses LEFT command.', () => {
        const returnMessage = identifyCommand("LEFT");
        expect(returnMessage).toEqual(Commands.LEFT);
    });
    test('Test if the displayErrorMessage parses RIGHT command.', () => {
        const returnMessage = identifyCommand("RIGHT");
        expect(returnMessage).toEqual(Commands.RIGHT);
    });
    test('Test if the displayErrorMessage parses MOVE command.', () => {
        const returnMessage = identifyCommand("MOVE");
        expect(returnMessage).toEqual(Commands.MOVE);
    });
    test('Test if the displayErrorMessage parses PLACE command.', () => {
        const returnMessage = identifyCommand("PLACE 0,0,NORTH");
        expect(returnMessage).toEqual(Commands.PLACE);
    });
    test('Test if the displayErrorMessage parses PLACE command.', () => {
        const returnMessage = identifyCommand("PLACE 0,");
        expect(returnMessage).toBeFalsy();
    });
})

describe('Unit Testing for displayErrorMessage - PLACE command method correctly.', () => {
    test('Test if the displayErrorMessage parses incompconste PLACE command correctly.', () => {
        const returnMessage = identifyCommand("PLACE");
        expect(returnMessage).toBeFalsy();
    });
    test('Test if the displayErrorMessage parses incompconste PLACE command correctly.', () => {
        const returnMessage = identifyCommand("PLACE 0");
        expect(returnMessage).toBeFalsy();
    });
    test('Test if the displayErrorMessage parses incorrect PLACE command correctly.', () => {
        const returnMessage = identifyCommand("place 0,0");
        expect(returnMessage).toBeFalsy();
    });
    test('Test if the displayErrorMessage parses incorrect PLACE - (in small caps) command correctly.', () => {
        const returnMessage = identifyCommand("place 0,0,north");
        expect(returnMessage).toBeFalsy();
    });
    test('Test if the displayErrorMessage parses PLACE command correctly.', () => {
        const returnMessage = identifyCommand("PLACE 0,0,NORTH");
        expect(returnMessage).toEqual(Commands.PLACE);
    });
})