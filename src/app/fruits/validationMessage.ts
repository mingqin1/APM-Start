export class ValidationMessage {
    message:string;
    type:string;

    constructor(message: string, type: string) {
        this.message=message;
        this.type=type;
     }
}