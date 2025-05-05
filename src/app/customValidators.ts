import { FormControl, AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static numberValidator(control: AbstractControl): ValidationErrors | null{
        return isNaN(control.value) ? {notANumber: true} : null;
    }
}