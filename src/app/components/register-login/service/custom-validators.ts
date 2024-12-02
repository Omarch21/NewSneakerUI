import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function confirmPasswordValidator(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const passwordKey = formGroup.get(password)?.value;
        const confirmPasswordKey = formGroup.get(confirmPassword)?.value;
        if(passwordKey !== confirmPasswordKey)
            return {passwordsMismatch: true}

        return null;
    }
}