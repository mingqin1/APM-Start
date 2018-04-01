import { ValidationMessage} from './validationMessage'

export interface IValidationErrors {
    [others:string]: ValidationMessage[];

}