import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-jobseeker-register',
  templateUrl: './jobseeker-register.component.html',
  styleUrls: ['./jobseeker-register.component.scss']
})
export class JobseekerRegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  registerFormError = '';
  headerData = {
    headerLinks : [
      {'label': 'home', 'url': '', 'clickEventRequired': true},
      {'label': 'login', 'url': '/jobseeker/login'}
    ],
    breadcrumbLinks: ['jobseeker', 'register'],
    profileName: '',
  }

  constructor(private router: Router, private headerService: HeaderService) { }
  ngOnInit(): void {
    this.headerService.updateHeaderLinks(this.headerData);
  }

  registerEmployer() {
    let resultObj = this.registerForm.form.value;
    let isAccountExist = this.checkForExistingAccount(resultObj);
    if(!isAccountExist) {
      this.registerFormError = '';
      resultObj['role'] = 'jobseeker';
      localStorage.setItem(resultObj.username, JSON.stringify(resultObj));
      this.router.navigate(['/jobseeker/login']);
    } else {
      this.registerFormError = 'Account with username already exist';
    }
  }

  checkForExistingAccount(resultObj: any) {
    let fetchedAccount = localStorage.getItem(resultObj.username);
    return fetchedAccount ? true : false;
  }

}
