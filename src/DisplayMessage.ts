import { Response } from "./Models/Response";
export function displayErrorMessage(response: Response): string{
    if (!response.Success) {
        console.log(response.Message)
        return response.Message
    }
    return ""
}