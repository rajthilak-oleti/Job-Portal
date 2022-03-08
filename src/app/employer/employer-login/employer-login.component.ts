import { Component, OnInit, ViewChild } from '@angular/core';``
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employer-login',
  templateUrl: './employer-login.component.html',
  styleUrls: ['./employer-login.component.scss']
})
export class EmployerLoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  loginError: string = '';
  headerData = {
    headerLinks : [
      {'label': 'home', 'url': '', 'clickEventRequired': true}
    ],
    breadcrumbLinks: ['employer', 'login'],
    profileName: '',
  }

  constructor(private router: Router, private authService: AuthService,
    private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderLinks(this.headerData);
  }

  performLogin() {
    this.loginError = '';
    let loginDetails = this.loginForm.form.value;
    let targetAccount = JSON.parse(localStorage.getItem(loginDetails.username) || '{}');
    if(targetAccount) {
      if(targetAccount['role'] === 'employer') {
        if(loginDetails.password === targetAccount.password) {
          this.loginError = '';
          targetAccount['isLoggedIn'] = true;
          localStorage.setItem(targetAccount.username, JSON.stringify(targetAccount))
          this.saveNewLoginInfo(targetAccount);
          this.router.navigate(['employer/dashboard']);
        } else {
          this.loginError = 'Incorrect Password'
        }
      } else {
        this.loginError = 'Sorry :(, No account exists with this username.';
      }
    } else {
      this.loginError = 'Sorry :(, No account exists with this username.';
    }
  }

  saveNewLoginInfo(loggedInAccount: any) {
    let userInfo = {
      'account': loggedInAccount,
      'role': loggedInAccount.role,
    }
    localStorage.setItem('activeUserInfo', JSON.stringify(userInfo));
  }
 
}
