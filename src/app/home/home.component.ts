import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  headerData = {
    headerLinks : [
      {'label': 'employer', 'url': '/employer/login'},
      {'label': 'Jobseeker', 'url': '/jobseeker/login'}
    ],
    breadcrumbLinks: [],
  }
  constructor(private headerService: HeaderService, private authService: AuthService) { }

  ngOnInit(): void {
    this.headerService.updateHeaderLinks(this.headerData);
    this.authService.logout();
  }

  clearLoginInfo() {
    localStorage.removeItem('activeUserInfo');
  }
}
