import { Directive } from '@angular/core';
import { Validator,AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appCustomPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomPasswordValidatorDirective,
      multi: true
    }
  ]
})

export class CustomPasswordValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    if(control.value != null && control.value !== '') {
      let hasNumber = /\d/.test(control.value);
      let hasAlphabet = /[A-Za-z]/.test(control.value);
      let hasSpecialChar = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(control.value);
      const isValid = hasNumber && hasAlphabet && hasSpecialChar;
      if (isValid) {
        return null;
      } else {
        return {passwordValidator: { valid: false }};
      } 
    } else {
      return null;
    }
  }
}