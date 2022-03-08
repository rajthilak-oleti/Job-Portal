import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss']
})
export class EmployerProfileComponent implements OnInit {
  @ViewChild('profileEdit') profileEditForm!: NgForm;
  userDetails: any;
  headerData = {
    breadcrumbLinks: ['employer', 'profile'],
    profileName: '',
  }
  constructor(private router: Router, private commonService: CommonService,
    private headerService: HeaderService) { }

  ngOnInit(): void {
    const activeUserInfo = JSON.parse(localStorage.getItem('activeUserInfo') || '{}');
    if(activeUserInfo) {
      this.userDetails = JSON.parse(localStorage.getItem(activeUserInfo.account.username) || '{}');
      this.headerData.profileName = activeUserInfo.account.firstName;
    }
    this.headerService.updateHeaderLinks(this.headerData);
  }

  updateProfile() {
    let prevDetails = this.userDetails;
    let updatedValues = this.profileEditForm.form.value;
    let resultObj = { ...prevDetails, ...updatedValues };
    if(prevDetails && updatedValues) {
      localStorage.setItem(resultObj.username, JSON.stringify(resultObj));
      this.commonService.updateActiveUserInfo('account', resultObj.username);
      this.router.navigate(['/employer/dashboard']);
    }
  }

  redirectToDashboard() {
    this.router.navigate(['/employer/dashboard'])
  }

}
