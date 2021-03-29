export class Response {
    Success: boolean;
    Message: string
    constructor(success: boolean, message: string) {
        this.Success = success;
        this.Message = message;
    }
}