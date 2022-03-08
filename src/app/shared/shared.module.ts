import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPasswordValidatorDirective } from './custom-password-validator.directive';



@NgModule({
  declarations: [
    CustomPasswordValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomPasswordValidatorDirective
  ]
})
export class SharedModule { }
