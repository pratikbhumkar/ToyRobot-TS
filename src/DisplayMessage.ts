import { Commands } from "./Models/Commands";
import { Response } from "./Models/Response";
export function displayErrorMessage(response: Response): string{
    if (!response.Success) {
        console.log(response.Message)
        return response.Message
    }
    return ""
}

export function presentResponse(command: string | boolean, response: Response): string {
    if (command === Commands.REPORT && response.Success) {
        console.log(response.Message);
        return response.Message;
    }
    return displayErrorMessage(response);
}